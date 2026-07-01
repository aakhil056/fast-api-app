from fastapi import APIRouter, HTTPException, Depends
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from schemas.company import CompanyCreate, CompanyUpdate, CompanyResponse
from models.company import Company
from models.job import Job
from sqlalchemy.orm import Session
from database import get_db


router = APIRouter(prefix="/company", tags=["company"])


@router.get("/", status_code=HTTP_200_OK)
def get_all_company(db: Session = Depends(get_db)):
    """Get all companies"""
    return db.query(Company).all()


@router.post("/", status_code=HTTP_201_CREATED)
def create_company(company_data: CompanyCreate, db: Session = Depends(get_db)):
    """Create a new company"""
    db_company = Company(**company_data.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


@router.get("/{company_id}", status_code=HTTP_200_OK)
def get_company(company_id: int, db: Session = Depends(get_db)):
    """Get a specific company by ID"""
    return db.query(Company).filter(Company.id == company_id).first()


@router.put("/{company_id}", status_code=HTTP_200_OK)
def update_company(company_id: int, company_data: CompanyUpdate, db: Session = Depends(get_db)):
    """Update a company"""
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    for key, value in company_data.dict(exclude_unset=True).items():
        setattr(db_company, key, value)
    db.commit()
    db.refresh(db_company)
    return db_company


@router.delete("/{company_id}", status_code=HTTP_204_NO_CONTENT)
def delete_company(company_id: int, db: Session = Depends(get_db)):
    """Delete a company"""
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(db_company)
    db.commit()
    return {"message": "Company deleted successfully."}



# @router.get("/")
# def read_company():
#     return{"company": "company root"}

# @router.get("/{company_id}")
# def read_company(company_id:int):
#     return{"company_id": "company_id"}