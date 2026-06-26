from pydantic import BaseModel
from typing import Optional

class Job(BaseModel):
    title: str
    salary: int

class JobCreate(BaseModel):
    title: Optional[str] = None
    salary: Optional[int] = None
