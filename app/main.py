from fastapi import FastAPI
from routers import company,job


app=FastAPI()
app.include_router(company.router)
@app.get("/")
def read_root():
    return{"hello":"world"}

@app.get("/about")
def read_about():
    return {"about": "This is about page"}

@app.get("/contact")
def read_contact():
    return {"contact": "This is contact page"}
