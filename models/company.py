from sqlalchemy import Column, Integer, String,Enum,relationship
from database import Base,engine,sessionlocal

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True,nullable=False)
    address = Column(String, index=True)
    email = Column(String, index=True,unique=True)
    phone_number = Column(String,nullable=False,index=True,unique=True)
    jobs = relationship("Job", back_populates="company")
