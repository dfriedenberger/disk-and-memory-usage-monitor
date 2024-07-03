from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_latest_disk_usage(db: Session):
    return db.query(models.DiskUsage).order_by(models.DiskUsage.timestamp.desc()).first()

def get_latest_memory_usage(db: Session):
    return db.query(models.MemoryUsage).order_by(models.MemoryUsage.timestamp.desc()).first()

def create_disk_usage(db: Session, disk_usage: schemas.DiskUsageBase):
    db_disk_usage = models.DiskUsage(**disk_usage.dict())
    db.add(db_disk_usage)
    db.commit()
    db.refresh(db_disk_usage)
    return db_disk_usage

def create_memory_usage(db: Session, memory_usage: schemas.MemoryUsageBase):
    db_memory_usage = models.MemoryUsage(**memory_usage.dict())
    db.add(db_memory_usage)
    db.commit()
    db.refresh(db_memory_usage)
    return db_memory_usage

def get_disk_usage_history(db: Session, start: datetime, end: datetime):
    return db.query(models.DiskUsage).filter(models.DiskUsage.timestamp.between(start, end)).all()

def get_memory_usage_history(db: Session, start: datetime, end: datetime):
    return db.query(models.MemoryUsage).filter(models.MemoryUsage.timestamp.between(start, end)).all()

