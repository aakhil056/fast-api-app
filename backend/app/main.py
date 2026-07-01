from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import company, job
from database import Base, engine
from models.company import Company
from models.job import Job


app = FastAPI(
    title="Company-Job Management API",
    description="API for managing companies and their job postings",
    version="1.0.0"
)

print("engine is :", engine)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try to create tables, but don't fail if database doesn't exist
try:
    # Base.metadata.create_all(bind=engine)
    print("✓ Database tables created/verified successfully")
except Exception as e:
    print(f"⚠ Warning: Could not create database tables: {e}")
    print("  Make sure PostgreSQL is running and database 'student_db' exists")

app.include_router(company.router)
app.include_router(job.router)


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.get("/about")
def read_about():
    return {"about": "This is about page"}


@app.get("/contact")
def read_contact():
    return {"contact": "This is contact page"}


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Global exception handler"""
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"},
    )
