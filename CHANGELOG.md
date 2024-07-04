# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with FastAPI backend and MySQL database.
- API endpoints to fetch current disk and memory usage.
- Background tasks to periodically fetch usage data and store it in the database.
- Frontend using HTML, CSS, and JavaScript to display usage data.
- Responsive design using Bootstrap for mobile and desktop views.
- Pie charts to show current disk and memory usage.
- Line charts to show historical usage trends.
- Feature to select different time ranges for historical data visualization.
- Docker and Docker Compose configuration for easy setup and deployment.

### Changed
- Adjusted frontend design for better mobile responsiveness.
- Updated JavaScript to use jQuery for API requests and chart updates.
- Improved visual representation of usage data with dynamic color coding based on thresholds.

### Fixed
- Addressed issues with date adapter in Chart.js.
- Corrected alignment of pie charts and numerical data in the frontend.
- replace window variable with hashmap 


