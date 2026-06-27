from pydantic import BaseModel
from typing import Optional

class company(BaseModel):
    location: int
    Name: str
    EMail: str
    Phone: str
class companyCreate(BaseModel):
    pass

class companyUpdate(companybase):
    name: Optional[str] = None
    location: Optional[int] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class companyupdate(companybase):
    name: Optional[str] = None
    location: Optional[int] = None
    email: Optional[str] = None
    phone: Optional[str] = None
class companyResponse(companybase):
    id: int
    jobs: list[jobResponse]
   
    class Config:
        only_attribute = True