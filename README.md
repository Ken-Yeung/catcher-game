# Full-Stack Application with ReactJS, ExpressJS, Redis, and Docker
```
Name: Cathcer
Description: A catch game web application
```
## Table of Contents

- [Full-Stack Application with ReactJS, ExpressJS, Redis, and Docker](#full-stack-application-with-reactjs-expressjs-redis-and-docker)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Installation](#installation)
  - [Usage](#usage)

## About

This project demonstrates a full-stack application setup using ReactJS for the frontend, ExpressJS for the backend, Redis as the database, and Docker for containerization. It showcases a scalable and maintainable setup for modern web applications.

## Prerequisites
- Docker installed
- Docker Version: `4.28.0`

## Configuration
Modify `Redis` Password at `./.env`
```
REDIS_PW={Your Password}
```

Modify `ExpressJS` Port at `./docker-compose.yml`
```
*Please update {Your Port} only!
ports:
    - "{Your Port}:{Default Port}"
```
Modify `ReactJS` at `./react-fe/.env`
```
REACT_APP_API_ORIGIN=http://localhost:8000
REACT_APP_API_V1_BASE=/api/v1
```

* After modified configuration run will have to build the docker image again

## Installation
To run at the first time
```
docker compose up
```
Wanna rebuild again
```
docker compose up --build
```
* Wait for the build
## Usage
- Go to [localhost website default port 3000](http://localhost:3000)
- And Have Fun
