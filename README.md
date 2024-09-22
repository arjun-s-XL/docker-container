# Deployment Guide

This guide provides instructions for deploying a JavaScript application using a Docker image from a private Docker Hub repository, with a public MongoDB image as the backend.

## Prerequisites

- Docker installed on your machine.
- Docker Hub account with the private image pushed.
- Basic knowledge of Docker and Docker Compose.

## Setup Instructions

### 1. Clone the Repository

Clone the repository containing your JavaScript application's Docker setup and navigate to the project directory.

### 2. Configure Docker Hub Credentials

Log in to Docker Hub to ensure you have access to the private image.

### 3. Docker Compose Configuration

Create a `docker-compose.yml` file with the following content:

```yaml
version: '3.8'

services:
  app:
    image: <your-dockerhub-username>/<your-private-image>:<tag>
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/<your-database>
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:


