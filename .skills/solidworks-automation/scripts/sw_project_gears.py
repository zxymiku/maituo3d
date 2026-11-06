"""Narrow MCP recipe for the three source-defined R5 gears; no assembly changes."""
from pathlib import Path
from typing import Literal
import json, math, traceback
from pydantic import BaseModel, ConfigDict

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'solidworks/齿轮单件'
AUDIT = ROOT / 'solidworks/检查记录/三齿轮独立建模'

class GearInput(BaseModel):
    model_config = ConfigDict(extra='forbid')
    part_id: Literal['G01','G02','G03']
    action: Literal['create','verify_saved'] = 'create'
    response_format: Literal['json','markdown'] = 'json'

def register_tools(mcp, run_locked, response_enum):
    @mcp.tool(name='solidworks_create_r5_gear', title='Create one source-defined R5 gear',
              annotations={'readOnlyHint':False,'destructiveHint':False,'idempotentHint':False,'openWorldHint':False})
    def create(params: GearInput) -> str:
        """Create G01/G02/G03 as a separate native part, save/reopen/audit/close only the owned document. Uses the project's frozen R5 dimensions. Does not assemble or modify existing documents."""
        return run_locked(lambda: finish_saved(params.part_id) if params.action=='verify_saved' else build(params.part_id), response_enum(params.response_format))

def build(pid):
    from scripts.sw_connect import connect_solidworks, new_document, save_document, open_document, get_com_member as get, create_empty_dispatch_variant as empty, close_owned_solidworks
    from scripts.sw_part import sketch, extrude_midplane, extrude_boss, extrude_cut, circular_pattern
    from scripts.sw_sketch_quality import inspect_sketch, inspect_model_sketches, fully_define_sketch
    from scripts.sw_review import save_preview, collect_geometry_measurements, collect_model_summary
    from scripts.sw_measure import collect_mass_properties
    from scripts.sw_export import export_to_step
    from scripts.sw_appearance import set_document_appearance
    src=json.loads((ROOT/'solar-car-r5/docs/完整尺寸数据.json').read_text(encoding='utf8'))
    part=next(p for p in src['parts'] if p['id']==pid)
    gear=part['solids'][0]
    z=int(gear['z']); mod=gear['m']; rr=mod*z/2-1.25*mod; ra=mod*z/2+mod
    OUT.mkdir(parents=True,exist_ok=True); AUDIT.mkdir(parents=True,exist_ok=True)
    path=OUT/f'R5_{pid}_{part["name"]}.SLDPRT'
    if path.exists(): raise FileExistsError(f'Refusing to overwrite {path}')
    rec={'part_id':pid,'name':part['name'],'source':'solar-car-r5/docs/完整尺寸数据.json',
         'path':str(path),'module_mm':mod,'teeth':z,'pressure_angle_deg':20,'face_width_mm':4,
         'hub_diameter_mm':gear['hub'][0],'hub_length_mm':3,'bore_diameter_mm':gear['bore'],
         'approximations':['渐开线按网页真源的每侧8段弦线复现；未添加制造侧隙和滚刀齿根修形。'], 'stages':[]}
    report=AUDIT/f'{pid}.json'
    def stage(name):
        rec['stages'].append(name);report.write_text(json.dumps(rec,ensure_ascii=False,indent=2),encoding='utf8')
        print(pid,name,flush=True)
    sw,existing,connection=connect_solidworks(version=2024,wait_seconds=2,return_metadata=True)
    rec['process_id']=get(sw,'GetProcessID'); rec['preexisting_active_title']=get(existing,'GetTitle') if existing else None
    model=new_document(sw,'part'); owned_title=get(model,'GetTitle');stage('new_owned_part')
    def named(f,name):
        if f is None: raise RuntimeError(f'Feature failed: {name}')
        f.Name=name;stage(name);return f
    def define(use_relations=False):
        model.SketchManager.AddToDB=False
        active=get(model.SketchManager,'ActiveSketch')
        # Dimension the original coordinates; never infer relations that move involute vertices.
        selected=False
        for origin in ['Origin','原点']:
            for point in ['Point1','点1']:
                if model.Extension.SelectByID2(point+'@'+origin,'EXTSKETCHPOINT',0,0,0,False,6,empty(),0):
                    selected=True;break
            if selected: break
        if not selected: raise RuntimeError('Origin not selectable')
        if use_relations:
            return fully_define_sketch(model)
        model.SketchManager.FullyDefineSketch(True,False,0,True,1,empty(),1,empty(),1,1)
        model.ClearSelection2(True)
        evidence=inspect_sketch(active)
        if evidence['status']!='pass': raise RuntimeError('Sketch definition failed: '+str(evidence))
        return evidence
    def lines(points):
        segments=[]
        for a,b in zip(points,points[1:]+points[:1]):
            if math.dist(a,b)<1e-10: continue
            obj=model.SketchManager.CreateLine(a[0]/1000,-a[1]/1000,0,b[0]/1000,-b[1]/1000,0)
            if obj is None: raise RuntimeError('CreateLine failed')
            segments.append((obj,a,b))
        return segments
    def verify_lines(segs):
        for obj,a,b in segs:
            for member,want in [('GetStartPoint2',a),('GetEndPoint2',b)]:
                p=get(obj,member)
                if math.dist((get(p,'X')*1000,-get(p,'Y')*1000),want)>1e-5:
                    raise RuntimeError('Dimensioning changed source profile')
    def circles(plane,items):
        with sketch(model,plane) as sk:
            model.SketchManager.AddToDB=True
            objs=[]
            for x,y,r in items:
                o=model.SketchManager.CreateCircleByRadius(x/1000,y/1000,0,r/1000)
                if o is None: raise RuntimeError('Circle failed')
                objs.append((o,x,y,r))
            define(use_relations=True)
            for o,x,y,r in objs:
                p=get(o,'GetCenterPoint2')
                if max(abs(get(p,'X')*1000-x),abs(get(p,'Y')*1000-y),abs(get(o,'GetRadius')*1000-r))>1e-5:
                    raise RuntimeError('Circle moved during dimensions')
        return sk
    try:
        # The source valleys are chords between tooth-gap midpoints, so the core
        # must be a regular polygon rather than a circle that fills those valleys.
        with sketch(model,'Top Plane') as sk:
            model.SketchManager.AddToDB=True
            pts=[(rr*math.cos((2*k+1)*math.pi/z),rr*math.sin((2*k+1)*math.pi/z)) for k in range(z)]
            segs=lines(pts)
            define(use_relations=(z==18));verify_lines(segs)
        core=named(extrude_midplane(model,sk,.004),'GearRootCore')
        sk=circles('Top Plane',[(0,0,gear['hub'][0]/2)])
        hub=named(extrude_boss(model,sk,.003,direction=False,start_offset=.002),'Hub_D%d_L3'%gear['hub'][0])
        # One source tooth, patterned natively, keeps the editable sketch compact.
        rp=mod*z/2; rb=rp*math.cos(math.pi/9)
        def inv(r):
            a=math.acos(min(1,rb/r));return math.tan(a)-a
        ip=inv(rp);half=math.pi/(2*z);flank0=-half-ip+inv(max(rr,rb))
        polar=[(rr,-math.pi/z),(rr,flank0)]
        for j in range(9):
            r=max(rr,rb)+(ra-max(rr,rb))*j/8;polar.append((r,-half-ip+inv(r)))
        for j in range(8,-1,-1):
            r=max(rr,rb)+(ra-max(rr,rb))*j/8;polar.append((r,half+ip-inv(r)))
        polar.extend([(rr,-flank0),(rr,math.pi/z)])
        pts=[]
        for r,a in polar:
            p=(r*math.cos(a),r*math.sin(a))
            if not pts or math.dist(p,pts[-1])>1e-8:pts.append(p)
        with sketch(model,'Top Plane') as sk:
            model.SketchManager.AddToDB=True;segs=lines(pts);define();verify_lines(segs)
        tooth=named(extrude_midplane(model,sk,.004),'InvoluteTooth_m05_a20')
        axisface=None
        for body in get(model,'GetBodies2',0,False) or []:
            for face in get(body,'GetFaces') or []:
                surf=get(face,'GetSurface')
                if get(surf,'IsCylinder'):
                    cp=get(surf,'CylinderParams')
                    if abs(cp[6]*2000-gear['hub'][0])<1e-5 and abs(cp[4])>.999:
                        axisface=face;break
        if axisface is None: raise RuntimeError('Hub axis face missing')
        named(circular_pattern(model,'InvoluteTooth_m05_a20',axisface,2*math.pi,z),'Teeth_%d'%z)
        if gear.get('roundBore'):
            sk=circles('Top Plane',[(0,0,gear['bore']/2)])
        else:
            r=gear['bore']/2; flat=r-.27;h=math.sqrt(r*r-flat*flat)
            with sketch(model,'Top Plane') as sk:
                model.SketchManager.AddToDB=True
                arc=model.SketchManager.Create3PointArc(flat/1000,-h/1000,0,flat/1000,h/1000,0,-r/1000,0,0)
                line=model.SketchManager.CreateLine(flat/1000,h/1000,0,flat/1000,-h/1000,0)
                if arc is None or line is None:raise RuntimeError('D bore profile failed')
                model.SketchManager.AddToDB=False
                center=get(arc,'GetCenterPoint2');center.Select4(False,empty())
                if not model.Extension.SelectByID2('Point1@Origin','EXTSKETCHPOINT',0,0,0,True,0,empty(),0):
                    if not model.Extension.SelectByID2('点1@原点','EXTSKETCHPOINT',0,0,0,True,0,empty(),0):raise RuntimeError('D bore origin missing')
                model.SketchAddConstraints('sgCOINCIDENT');model.ClearSelection2(True)
                define()
                if abs(get(arc,'GetRadius')*1000-r)>1e-5:raise RuntimeError('D bore radius changed')
                p=get(arc,'GetCenterPoint2')
                if math.hypot(get(p,'X'),get(p,'Y'))>1e-8:raise RuntimeError('D bore center changed')
                verify_lines([(line,(flat,-h),(flat,h))])
        named(extrude_cut(model,sk,0,both_directions=True),'RoundBore_5p03' if pid=='G01' else 'D_Bore_%g_Flat_%g'%(2*r,flat))
        if pid=='G01':
            holes=[(0,-10,1.6),(-math.sqrt(75),-5,1.6),(-math.sqrt(75),5,1.6),(0,10,1.6),(math.sqrt(75),5,1.6),(math.sqrt(75),-5,1.6)]
            sk=circles('Top Plane',holes)
            named(extrude_cut(model,sk,0,both_directions=True),'Parking_6xD3p2_PCD20')
            # Right Plane local u=-Z,v=Y. Blind radial bore is x=2..5.
            sk=circles('Right Plane',[(0,3.5,.8)])
            named(extrude_cut(model,sk,.005,direction=True),'M2_TapDrill_D1p6_Radial')
            rec['thread_note']='径向M2×0.4攻丝底孔Ø1.6；有效螺纹长2.5，实体螺旋牙未建模。'
            rec['approximations'].append('G01径向M2×0.4以Ø1.6攻丝底孔表达，未建螺旋牙。')
        model.SketchManager.AddToDB=False;model.ClearSelection2(True)
        stage('checking_before_save')
        model.ForceRebuild3(False)
        rec['sketch_audit_before']=inspect_model_sketches(model)
        if rec['sketch_audit_before']['status']!='pass':raise RuntimeError('Consumed sketch audit failed')
        rec['measurements_before']=collect_geometry_measurements(model)
        if len(get(model,'GetBodies2',0,False) or [])!=1:raise RuntimeError('Expected exactly one solid')
        set_document_appearance(model,(.72,.74,.78))
        if not save_document(model,str(path)):raise RuntimeError('Save failed')
        stage('saved_native')
        owned_title=get(model,'GetTitle');sw.CloseDoc(owned_title);model=None
        model=open_document(sw,str(path),silent=True,raise_on_error=True);owned_title=get(model,'GetTitle')
        get(model,'EditRebuild3')
        stage('reopened_auditing')
        rec['sketch_audit_reopened']=inspect_model_sketches(model)
        if rec['sketch_audit_reopened']['status']!='pass':raise RuntimeError('Reopened sketch audit failed')
        rec['measurements_reopened']=collect_geometry_measurements(model)
        rec['mass_properties']=collect_mass_properties(model)
        rec['model_summary']=collect_model_summary(model)
        if rec['model_summary']['faulty_features']:raise RuntimeError('Reopened model has faulty features')
        rec['source_volume_mm3']=part['volumeMm3']
        rec['source_volume_error_percent']=100*abs(rec['mass_properties']['volume_mm3']-part['volumeMm3'])/part['volumeMm3']
        if rec['source_volume_error_percent']>.15:raise RuntimeError('Source volume mismatch exceeds 0.15 percent')
        rec['body_count']=len(get(model,'GetBodies2',0,False) or [])
        rec['previews']=[save_preview(model,AUDIT/f'{pid}_{v}.bmp',v,width=1300,height=900) for v in ['isometric','top','front','right']]
        step=path.with_suffix('.STEP');rec['step_export']=export_to_step(model,str(step))
        if not save_document(model,str(path)):raise RuntimeError('Final save failed')
        stage('reopened_verified')
        sw.CloseDoc(owned_title);model=None;rec['closed']=True
        if sw.GetOpenDocumentByName(str(path)) is not None:raise RuntimeError('Own part remains open')
        rec['status']='native_saved_verified';stage('closed_owned_part')
        table=ROOT/'零件表.md';txt=table.read_text(encoding='utf8')
        import re
        txt=re.sub(r'^\| '+pid+r' \| [^\n]+$',lambda m: f'| {pid} | {part["name"]} | 自制 | [x] | 2026-11-05 独立完整齿形重建：齿轮单件/{path.name}；保存重开、草图通过、已关闭 |' if '自制' in m.group() else f'| {pid} | 齿轮单件/{path.name} | native_saved_verified |',txt,flags=re.M)
        table.write_text(txt,encoding='utf8')
        ledger=ROOT/'solidworks/检查记录/build-index-v2.json'
        old=json.loads(ledger.read_text(encoding='utf8'))
        if isinstance(old,dict):
            # Preserve the original ledger structure; attach standalone revisions.
            old.setdefault('standalone_gear_revisions',{})[pid]={'status':rec['status'],'path':str(path),'audit':str(report)}
            ledger.write_text(json.dumps(old,ensure_ascii=False,indent=2),encoding='utf8')
        close_owned_solidworks(sw,connection['started_by_cad_studio'],rec['process_id'])
        return rec
    except Exception:
        rec['status']='failed';rec['error']=traceback.format_exc()
        if model is not None:
            model.SketchManager.AddToDB=False
            failpath=AUDIT/f'{pid}_incomplete.SLDPRT'
            try:
                if save_document(model,str(failpath)):
                    sw.CloseDoc(get(model,'GetTitle'));rec['incomplete_saved_closed']=True
            except Exception:pass
        report.write_text(json.dumps(rec,ensure_ascii=False,indent=2,default=str),encoding='utf8')
        if rec.get('incomplete_saved_closed'):
            close_owned_solidworks(sw,connection['started_by_cad_studio'],rec['process_id'])
        raise

def finish_saved(pid):
    """Finish the already saved, source-owned part after an interrupted review."""
    from scripts.sw_connect import connect_solidworks, open_document, save_document, get_com_member as get, close_owned_solidworks
    from scripts.sw_review import collect_geometry_measurements, collect_model_summary, save_preview
    from scripts.sw_sketch_quality import inspect_model_sketches
    from scripts.sw_measure import collect_mass_properties
    from scripts.sw_export import export_to_step
    report=AUDIT/f'{pid}.json';rec=json.loads(report.read_text(encoding='utf8'))
    path=Path(rec['path'])
    if path.parent!=OUT or 'saved_native' not in rec['stages']:raise RuntimeError('Not an owned saved gear')
    sw,existing,connection=connect_solidworks(version=2024,return_metadata=True)
    model=open_document(sw,str(path),silent=True,raise_on_error=True)
    try:
        get(model,'EditRebuild3')
        rec['sketch_audit_reopened']=inspect_model_sketches(model)
        if rec['sketch_audit_reopened']['status']!='pass':raise RuntimeError('Sketch audit failed')
        rec['measurements_reopened']=collect_geometry_measurements(model)
        rec['mass_properties']=collect_mass_properties(model)
        rec['model_summary']=collect_model_summary(model)
        if rec['model_summary']['faulty_features']:raise RuntimeError('Faulty features')
        src=json.loads((ROOT/'solar-car-r5/docs/完整尺寸数据.json').read_text(encoding='utf8'))
        part=next(p for p in src['parts'] if p['id']==pid)
        rec['source_volume_mm3']=part['volumeMm3']
        rec['source_volume_error_percent']=100*abs(rec['mass_properties']['volume_mm3']-part['volumeMm3'])/part['volumeMm3']
        if rec['source_volume_error_percent']>.15:raise RuntimeError('Source volume mismatch')
        rec['body_count']=len(get(model,'GetBodies2',0,False) or [])
        if rec['body_count']!=1:raise RuntimeError('Expected one solid')
        rec['previews']=[save_preview(model,AUDIT/f'{pid}_{v}.bmp',v,width=1300,height=900) for v in ['isometric','top','front','right']]
        rec['step_export']=export_to_step(model,str(path.with_suffix('.STEP')))
        if not rec['step_export']:raise RuntimeError('STEP export failed')
        if not save_document(model,str(path)):raise RuntimeError('Final save failed')
        sw.CloseDoc(get(model,'GetTitle'));model=None
        rec['closed']=sw.GetOpenDocumentByName(str(path)) is None
        if not rec['closed']:raise RuntimeError('Part remains open')
        rec['status']='native_saved_verified';rec.pop('error',None)
        rec['stages'].extend(['reopened_verified','closed_owned_part'])
        report.write_text(json.dumps(rec,ensure_ascii=False,indent=2),encoding='utf8')
        import re
        table=ROOT/'零件表.md';txt=table.read_text(encoding='utf8')
        txt=re.sub(r'^\| '+pid+r' \| [^\n]+$',lambda m:f'| {pid} | {part["name"]} | 自制 | [x] | 2026-11-05 独立完整齿形重建：齿轮单件/{path.name}；保存重开、草图通过、已关闭 |' if '自制' in m.group() else f'| {pid} | 齿轮单件/{path.name} | native_saved_verified |',txt,flags=re.M)
        table.write_text(txt,encoding='utf8')
        ledger=ROOT/'solidworks/检查记录/build-index-v2.json';old=json.loads(ledger.read_text(encoding='utf8'))
        old.setdefault('standalone_gear_revisions',{})[pid]={'status':rec['status'],'path':str(path),'audit':str(report)}
        ledger.write_text(json.dumps(old,ensure_ascii=False,indent=2),encoding='utf8')
        return rec
    finally:
        if model is not None:
            if save_document(model,str(path)):sw.CloseDoc(get(model,'GetTitle'))
        close_owned_solidworks(sw,connection['started_by_cad_studio'],get(sw,'GetProcessID'))
