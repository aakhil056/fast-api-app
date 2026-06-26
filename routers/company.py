from fastapi import APIRouter
from schemas.company import CompanyCreate


router=APIRouter(prefix="/company",tags=["company"])
companies=[]

@router.get("/")
def get_all_company():
    return companies

@router.post("/")
def create_company(company_data: CompanyCreate):
    companies.append(company_data.dict())
    return companies

@router.get("/{company_id}")
def get_company(company_id:int):
    return companies[company_id] 

@router.put("/{company_id}")
def update_company(company_id:int,company_data:CompanyCreate):
    companies[company_id]=company_data.dict()
    return companies[company_id]

@router.delete("/{company_id}")
def delete_company(company_id:int):
    companies.pop(company_id)
    return {"message": "Company deleted successfully."}



# @router.get("/")
# def read_company():
#     return{"company": "company root"}

# @router.get("/{company_id}")
# def read_company(company_id:int):
#     return{"company_id": "company_id"}