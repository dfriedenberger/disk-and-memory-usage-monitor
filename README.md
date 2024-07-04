# Disk and Memory Usage Monitor

## Description

This project provides a web service to monitor disk and memory usage on a server. It uses FastAPI for the backend and Chart.js for the frontend to display current and historical usage data. The backend collects data periodically and stores it in a MySQL database. The frontend displays this data in a responsive web interface, showing current usage as well as historical trends over customizable time ranges.

![Frontend](docs/frontend.png?raw=true "Frontend")


## Features

- Display current disk and memory usage.
- Historical usage trends over customizable time ranges (last 3 hours, last day, last week, last month, custom date range).
- Responsive web interface using Bootstrap.
- Usage data represented in percentage and absolute values.
- Visual representation using doughnut and line charts.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/disk-memory-monitor.git
    cd disk-memory-monitor
    ```

2. Create a `.env` file with the following content:

    ```env
    MYSQL_ROOT_PASSWORD=<rootpassword>
    MYSQL_USER=<user>
    MYSQL_PASSWORD=<password>
    MYSQL_DB=disk_memory_db
    WEB_PORT=8000
    ```

3. Start the services using Docker Compose:

    ```sh
    docker-compose up --build
    ```

### Usage

- Open a web browser and go to `http://localhost:8000`.
- The API documentation is available at `http://localhost:8000/docs`.

## Architecture

### Context Diagramm (C4 Level 1)
![Context Diagram](docs/C4-Level1-ContextDiagram.png?raw=true "Context Diagram")

### Container Diagramm (C4 Level 2)
![Container Diagram](docs/C4-Level2-ContainerDiagram.png?raw=true "Container Diagram")

### Component Diagram Frontend (C4 Level 3)
![Component Diagram Frontend](docs/C4-Level3-ComponentDiagramFrontend.png?raw=true "Component Diagram Frontend")

### Component Diagram Backend (C4 Level 3)
![Component Diagram Backend](docs/C4-Level3-ComponentDiagramBackend.png?raw=true "Component Diagram Backend")

### Deployment Diagram
![Deployment Diagram](docs/DeploymentDiagram.png?raw=true "Deployment Diagram")

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/)
- [Chart.js](https://www.chartjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker](https://www.docker.com/)
- [Make a README](https://www.makeareadme.com/)
- [Keep a changelog](https://keepachangelog.com)
- [C4 Model](https://c4model.com/)

## Note

This project was created by ChatGPT based on the requirements provided. Some adjustments and corrections were made by the user to finalize the project.
