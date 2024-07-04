from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.disk_usage import get_disk_usage
from src.memory_usage import get_memory_usage
from src import crud, schemas
import time


def collect_data():
    while True:
        db: Session = SessionLocal()

        disk_data = get_disk_usage()
        if disk_data:
            disk_usage = schemas.DiskUsageBase(**disk_data)
            print("get_disk_usage", disk_usage)

            crud.create_disk_usage(db, disk_usage)

        memory_data = get_memory_usage()
        if memory_data:
            memory_usage = schemas.MemoryUsageBase(**memory_data)
            print("get_memory_usage", memory_usage)
            crud.create_memory_usage(db, memory_usage)

        db.close()
        time.sleep(60)  # Collect data every 60 seconds


if __name__ == "__main__":
    collect_data()
