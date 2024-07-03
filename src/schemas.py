from pydantic import BaseModel
from datetime import datetime

class DiskUsageBase(BaseModel):
    total: str
    used: str
    available: str
    percent: str

class DiskUsage(DiskUsageBase):
    timestamp: datetime

    class Config:
        orm_mode = True

class MemoryUsageBase(BaseModel):
    total_memory: float
    used_memory: float
    available_memory: float
    percent_used: float

class MemoryUsage(MemoryUsageBase):
    timestamp: datetime

    class Config:
        orm_mode = True
