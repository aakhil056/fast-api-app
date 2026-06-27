from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.company import Company
from database import Base


class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, nullable=False)
    salary = Column(Integer, nullable=False)
    description = Column(String(1000), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    
    # Relationship
    company = relationship("Company", back_populates="jobs") 