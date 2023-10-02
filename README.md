# Restaurant App

[![Nest](https://nestjs.com/img/logo_text.svg)](https://nestjs.com/)

## Description

Restaurant App, allows to query restaurants

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Getting Started

### Prerequisites
- Docker & Docker-Compose

### Installation

- Navigate to the directory where you want to clone the app

```bash
# Clone the repository
git clone https://github.com/EmmaTobi/backend-restaurant-app.git

# Change to the project directory
cd backend-restaurant-app

# copy .env.example to .env
cp .env.example .env

# Build image and start up the application
docker-compose up --build

# Stop the application first time
docker-compose down
```
### Usage
- Assuming BASE_URL=localhost and PORT=3000
- Navigate to http://BASE_URL:PORT/api# to view the swagger docs

### Extras
- To test on an already deployed running instance of this app
- Go to `http://ec2-3-83-163-119.compute-1.amazonaws.com:3000/api` to see the swagger docs.