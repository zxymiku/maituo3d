import sys,time,traceback,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.skills/solidworks-automation/scripts'))
from sw_session import SolidWorksSession
from sw_connect import get_com_member as get
from sw_assembly import *
session=SolidWorksSession(max_documents=400)
sw=session.sw
model=session.open(str(ROOT/'solidworks/太阳能小车R5总装_配合装配.SLDASM'),silent=True)
comps=list(get(model,'GetComponents',False) or [])
print('READY',get(sw,'RevisionNumber'),len(comps),flush=True)
jobs=ROOT/'solidworks/检查记录/mate_jobs'
jobs.mkdir(parents=True,exist_ok=True)
while True:
    for job in sorted(jobs.glob('*.py')):
        try:
            exec(compile(job.read_text(encoding='utf-8'),str(job),'exec'),globals())
        except Exception:
            traceback.print_exc()
        job.replace(job.with_suffix('.done'))
        print('JOB_DONE',job.name,flush=True)
    time.sleep(1)
