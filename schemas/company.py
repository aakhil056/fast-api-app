from pydantic import BaseModel
from typing import Optional


class Company(BaseModel):
    name: str
    address: Optional[str] = None
    email: str
    phone_number: str


class CompanyCreate(Company):
    pass


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None


class CompanyResponse(Company):
    id: int

    class Config:
        from_attributes = True