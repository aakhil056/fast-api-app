from pydantic import BaseModel
from typing import Optional


class CompanyBase(BaseModel):
    name: str
    address: Optional[str] = None
    email: str
    phone_number: str


class Company(CompanyBase):
    pass


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None


class CompanyResponse(CompanyBase):
    id: int

    class Config:
        from_attributes = True