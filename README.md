# Disk and Memory Usage Monitor

This project provides a web service to monitor disk and memory usage using FastAPI. The information is gathered from the host system and displayed through a web interface. The data is also available via JSON endpoints.

## Features

- Monitor disk usage using the `df -h` command.
- Monitor memory usage by reading `/proc/meminfo`.
- Data is stored in a MySQL database.
- Display current usage and historical data in a graphical format.
- Dockerized for easy deployment.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd disk_memory_monitor
    ```

2. Build and start the Docker containers:
    ```sh
    docker-compose up --build
    ```

3. Access the web service:
    - API: `http://localhost:8000`
    - Web Interface: `http://localhost:8000/static/index.html`

## API Endpoints

- `/disk-usage`: Returns the latest disk usage data in JSON format.
- `/memory-usage`: Returns the latest memory usage data in JSON format.
