import sys,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.skills/solidworks-automation/scripts'))
from sw_session import SolidWorksSession
from sw_connect import get_com_member as get
from sw_assembly import _activate_model_document
from sw_export import export_to_stl
dest=ROOT/'面试答辩/.build/assets';dest.mkdir(parents=True,exist_ok=True)
spec=json.loads((ROOT/'solar-car-r5/docs/完整尺寸数据.json').read_text(encoding='utf-8'))
groups={}
for p in spec['placements']: groups.setdefault(p['solidworksFile'],[]).append(p)
session=SolidWorksSession(max_documents=400)
sw=session.sw
model=session.open(str(ROOT/'solidworks/太阳能小车R5总装_配合装配.SLDASM'),silent=True)
placements=[]
for c in get(model,'GetComponents',False) or []:
    path=Path(get(c,'GetPathName')); name=get(c,'Name2')
    if path.stem.startswith(('P60_','P19_','P20_')):
        pid=path.stem[:3];p=next(p for p in spec['placements'] if p['partId']==pid)
    else:
        ix=int(name.rsplit('-',1)[1])-1;p=groups[path.name][ix]
    values=list(get(get(c,'Transform2'),'ArrayData'))
    placements.append(dict(p,nativeTransform=values,componentName=name))
placements.sort(key=lambda p:p['instanceId'])
(dest/'native-placements.json').write_text(json.dumps(placements,ensure_ascii=False),encoding='utf-8')
print('TRANSFORMS',len(placements),flush=True)
for pid in ['P60','P19','P20']:
    path=ROOT/'solidworks/装配修订'/f'{pid}_装配修订.SLDPRT'
    part=session.open(str(path),read_only=True,silent=True)
    assert export_to_stl(part,str(dest/f'{pid}.stl'))
    sw.CloseDoc(get(part,'GetTitle'))
    print('STL',pid,flush=True)
_activate_model_document(sw,model)
sw.UserControl=True
