from fastapi import APIRouter, Depends, HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from schemas.job import JobCreate, JobUpdate, JobResponse
from models.job import Job
from sqlalchemy.orm import Session
from database import get_db


router = APIRouter(prefix="/job", tags=["job"])


@router.get("/", status_code=HTTP_200_OK)
def get_all_job(db: Session = Depends(get_db)):
    """Get all jobs"""
    return db.query(Job).all()


@router.post("/", status_code=HTTP_201_CREATED)
def create_job(job_data: JobCreate, db: Session = Depends(get_db)):
    """Create a new job"""
    db_job = Job(**job_data.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


@router.get("/{job_id}", status_code=HTTP_200_OK)
def get_job(job_id: int, db: Session = Depends(get_db)):
    """Get a specific job by ID"""
    return db.query(Job).filter(Job.id == job_id).first()


@router.put("/{job_id}", status_code=HTTP_200_OK)
def update_job(job_id: int, job_data: JobUpdate, db: Session = Depends(get_db)):
    """Update a job"""
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    for key, value in job_data.dict(exclude_unset=True).items():
        setattr(db_job, key, value)
    db.commit()
    db.refresh(db_job)
    return db_job


@router.delete("/{job_id}", status_code=HTTP_204_NO_CONTENT)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    """Delete a job"""
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(db_job)
    db.commit()
    return {"message": "Job deleted successfully."}