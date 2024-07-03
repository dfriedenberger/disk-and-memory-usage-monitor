from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from src import models, schemas, crud, database
from fastapi.staticfiles import StaticFiles

app = FastAPI()


database.Base.metadata.create_all(bind=database.engine)

@app.get("/disk-usage", response_model=schemas.DiskUsage)
def read_disk_usage(db: Session = Depends(database.get_db)):
    return crud.get_latest_disk_usage(db)

@app.get("/memory-usage", response_model=schemas.MemoryUsage)
def read_memory_usage(db: Session = Depends(database.get_db)):
    return crud.get_latest_memory_usage(db)

@app.get("/disk-usage/history", response_model=List[schemas.DiskUsage])
def read_disk_usage_history(start: datetime, end: datetime, db: Session = Depends(database.get_db)):
    return crud.get_disk_usage_history(db, start, end)

@app.get("/memory-usage/history", response_model=List[schemas.MemoryUsage])
def read_memory_usage_history(start: datetime, end: datetime, db: Session = Depends(database.get_db)):
    return crud.get_memory_usage_history(db, start, end)


app.mount("/", StaticFiles(directory="src/static", html=True))
