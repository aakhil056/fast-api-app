from pydantic import BaseModel
from typing import Optional

class JobCreate(BaseModel):
    name: str
    salary: int
    description: Optional[str] = None
    company_id: int

class JobCreate(jobbase):
    pass

class JobUpdate(BaseModel):
    name: Optional[str] = None
    salary: Optional[int] = None
    description: Optional[str] = None
    company_id: Optional[int] = None
class JobResponse(jobbase):
    id: int
    companyid:int

    class Config:
       from_attributes = True