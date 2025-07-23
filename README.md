# SeaWave

SeaWave is a modern, full-stack ticket booking system featuring a scalable Spring Boot microservices backend and a dynamic React.js frontend. It offers effortless event discovery, secure ticket purchasing, and real-time event handling through Apache Kafka, all packaged into Docker containers for one-command deployment.

## User Interface Screenshots

<div align="center">
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/1.png?raw=true" width="300" alt="Login Screen" />
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/2.png?raw=true" width="300" alt="Authentication Screen" />
</div>
<p align="center"><em>Authentication using Authorization Code Flow with PKCE Grant Type</em></p>

<div align="center">
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/3.png?raw=true" width="300" alt="Home Page" />
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/4.png?raw=true" width="300" alt="Events Display" />
</div>
<p align="center"><em>Home page with events display</em></p>

<div align="center">
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/5.png?raw=true" width="300" alt="Booking Tickets" />
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/6.png?raw=true" width="300" alt="Viewing Tickets" />
</div>
<p align="center"><em>Booking tickets and viewing them</em></p>

<div align="center">
  <img src="https://github.com/Navadeep-Reddy/ProjectScreenshots/blob/main/SeaWaveScreenshots/architecture.png?raw=true" width="800" alt="System Architecture" />
</div>
<p align="center"><em>System Architecture Diagram</em></p>

## Features

-   Effortless event discovery and ticket booking
-   Secure authentication & authorization via Auth0 (OAuth 2.0 & OpenID Connect)
-   Scalable Spring Boot microservices architecture
-   Real-time, event-driven processing with Apache Kafka
-   Centralized routing via Spring Cloud Gateway
-   Responsive, single-page React.js frontend
-   Containerized deployment using Docker Compose
-   Versioned database migrations with Flyway
-   Service-owned PostgreSQL databases for true microservices isolation

## Architecture

### Microservices

-   **API Gateway**: Routes client requests to appropriate backend services and enforces CORS, auth, and rate limiting.
-   **User Service**: Manages user profiles, synchronizes with Auth0, and exposes customer data via REST.
-   **Inventory Service**: Maintains event listings, ticket capacity, and seeds initial data from a custom Postgres image.
-   **Booking Service**: Processes booking requests, updates inventory capacity, publishes booking events to Kafka topics.
-   **Order Service**: Persists orders, supports queries by user or order ID, and handles eventual consistency via event subscriptions.

### Event-Driven Messaging

-   Producers (Booking Service) publish BookingEvent messages to Kafka topics.
-   Consumers (Order Service, Inventory Service) subscribe to topics to process events asynchronously, enabling decoupled capacity updates and order persistence.
-   Kafka Connect can be added to integrate external systems without custom code.

### Data Management

-   Each service owns its PostgreSQL instance with Flyway migrations to handle schema evolution and seed data.
-   No cross-service foreign keys—relationships and data integrity are enforced at the application layer or via events.

## Tech Stack

-   Java 21, Spring Boot, Spring Cloud Gateway, Spring Data JPA, Flyway
-   React.js, Vite, TypeScript
-   Apache Kafka, Confluent Schema Registry
-   Auth0 (IAM), JWT tokens stored in localStorage
-   PostgreSQL (SERIAL/BIGSERIAL for auto-increment)
-   Docker, Docker Compose

## Prerequisites

-   Docker ≥ 20.10
-   Docker Compose ≥ 1.29
-   Git

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/SeaWave.git
cd SeaWave
```

2. Build and start all services

```bash
docker-compose up --build
```

3. Open the React frontend at

```
http://localhost:5173
```

## Project Structure

```
SeaWave/
├── client/                # React.js SPA
├── gateway/               # Spring Cloud Gateway config
├── user-service/          # Spring Boot User Service
├── inventory-service/     # Spring Boot Inventory Service
├── booking-service/       # Spring Boot Booking Service
├── order-service/         # Spring Boot Order Service
├── docker-compose.yaml    # Orchestrates all containers
└── README.md              # Project documentation
```

## Authentication Flow

1. React app redirects users to Auth0 for login (Auth Code + PKCE).
2. Auth0 issues ID, Access, and Refresh tokens.
3. React stores tokens in localStorage and includes the Access Token in Authorization: Bearer headers.
4. Spring Boot services validate JWTs against Auth0's public keys and enforce role-based access.

## Recent Changes

-   Integrated Auth0 and refactored from Keycloak for user management
-   Swapped Inventory Postgres image with a seeded custom image
-   Exposed React app on port 5173 and parameterized gateway URI
-   Added Dockerfile for the client and containerized all backend services
-   Set JWT cache location to localStorage for SPA compatibility
-   Refactored Inventory capacity updates to occur via BookingService events
-   Removed synchronous cross-service calls in favor of event-driven state transfer
-   Introduced Flyway migrations to update Customer schema for Auth0 integration
-   Hotswapped monolithic DB to per-service databases for InventoryService
-   Fixed CORS preflight AJAX request issues across services
-   Configured all API endpoints through the API Gateway
-   Improved UI for displaying placed orders and streamlined navigation
