from fastapi import APIRouter
from schemas.job import JobCreate

router=APIRouter(prefix="/job",tags=["job"])
jobs=[]

@router.get("/")
def get_all_job():
    return jobs

@router.post("/")
def create_job(job_data: JobCreate):
    jobs.append(job_data.dict())
    return jobs

@router.get("/{job_id}")
def get_job(job_id: int):
    return jobs[job_id]

@router.put("/{job_id}")
def update_job(job_id: int, job_data: JobCreate):
    jobs[job_id] = job_data.dict()
    return jobs[job_id]

@router.delete("/{job_id}")
def delete_job(job_id: int):
    jobs.pop(job_id)
    return {"message": "Job deleted successfully."}