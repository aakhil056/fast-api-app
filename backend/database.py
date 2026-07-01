from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Database configuration
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:123456789@localhost:5432/student_db"

# Create engine with echo enabled for debugging
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False,  # Set to True for SQL query logging
    pool_pre_ping=True,  # Verify connections before using
    pool_size=10,
    max_overflow=20
)

# SessionLocal is the database session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is used for ORM models
Base = declarative_base()


def get_db():
    """Database session dependency for FastAPI routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()