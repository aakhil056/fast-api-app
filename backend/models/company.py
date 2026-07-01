from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    address = Column(String(500), nullable=True)
    email = Column(String(255), index=True, unique=True, nullable=False)
    phone_number = Column(String(20), nullable=False, index=True, unique=True)
    
    # Relationship
    jobs = relationship("Job", back_populates="company", cascade="all, delete-orphan")
