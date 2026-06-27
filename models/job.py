from sqlachemy import Column, Integer, String,enum,foreignKey,relationship
from models.company import Company
from database import Base,engine,sessionlocal

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True,nullable=False)
    salary = Column(Integer,nullable=False)
    company_id = Column(Integer,ForeignKey("companies.id"),nullable=False)
    company = relationship("Company", back_populates="jobs") 