from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from .database import Base

class DiskUsage(Base):
    __tablename__ = "disk_usage"

    id = Column(Integer, primary_key=True, index=True)
    total = Column(String(32), index=True)
    used = Column(String(32), index=True)
    available = Column(String(32), index=True)
    percent = Column(String(32), index=True)
    timestamp = Column(DateTime, server_default=func.now())

class MemoryUsage(Base):
    __tablename__ = "memory_usage"

    id = Column(Integer, primary_key=True, index=True)
    total_memory = Column(Float, index=True)
    used_memory = Column(Float, index=True)
    available_memory = Column(Float, index=True)
    percent_used = Column(Float, index=True)
    timestamp = Column(DateTime, server_default=func.now())
