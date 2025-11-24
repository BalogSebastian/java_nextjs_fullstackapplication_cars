🚗 Auto Collection Pro - Full Stack Vehicle Management
This is a robust, enterprise-grade full-stack application I built to manage a vehicle fleet. The goal was to create a seamless CRUD system that handles relationships between Cars, Manufacturers, and Owners, wrapped in a modern, responsive UI.

I designed this as a monorepo containing both the Spring Boot backend and the Next.js frontend, fully containerized with Docker for a "one-command" deployment.

🛠 Tech Stack
I chose a modern, type-safe, and highly scalable stack for this project:

Backend (The Core)
Java 21 (Latest LTS)

Spring Boot 3.4.12 (REST API, Dependency Injection)

Spring Data JPA / Hibernate (ORM and Database management)

PostgreSQL (Relational Database)

Lombok (To keep the code clean and boilerplate-free)

JaCoCo (Code coverage - achieved 100% test coverage)

JUnit 5 & Mockito (Unit and Integration testing)

Frontend (The Interface)
Next.js (App Router structure)

TypeScript (For type safety)

Tailwind CSS (Custom dark-mode UI with glassmorphism effects)

Jest & React Testing Library (Component testing)

DevOps & Infrastructure
Docker & Docker Compose (Containerizes DB, Backend, and Frontend)

🚀 How to Run It
You don't need to install Java, Node.js, or PostgreSQL on your machine. You only need Docker Desktop.

Clone the repository:

Bash

git clone https://github.com/YOUR_USERNAME/auto-kollekcio-fullstack.git
cd auto-kollekcio-fullstack
Run everything with one command:

Bash

docker-compose up --build
Open your browser:

Frontend: http://localhost:3000

Backend API: http://localhost:8080/api/autok (if you want to check raw JSON)

Note: The database runs on port 5433 to avoid conflicts if you have a local Postgres instance running.

📂 Project Structure
The project is organized as a monorepo:

Plaintext

auto-kollekcio-fullstack/
├── docker-compose.yml      # Orchestrates the 3 containers (DB, API, Web)
├── pom.xml                 # Maven build configuration
├── Dockerfile              # Backend container recipe
├── src/                    # Java Spring Boot Source Code
│   ├── model/              # Entities (Auto, Gyarto, Tulajdonos)
│   ├── repository/         # JPA Repositories
│   └── controller/         # REST Controllers
└── frontend/               # Next.js Source Code
    ├── app/                # App Router pages
    ├── components/         # Reusable UI components
    ├── Dockerfile          # Frontend container recipe
    └── ...
✨ Key Features
Dashboard Overview: Real-time statistics about the fleet size and total horsepower.

Complete CRUD: You can Add, Read, Edit, and Delete vehicles directly from the UI.

Relational Data: The system handles relationships—every car is linked to a specific Manufacturer and Owner in the background.

Modern UI: I built a custom dark theme with Tailwind, featuring animated cards, modals, and responsive layouts.

Smart Form: The edit form handles data intelligently—it allows modifying vehicle specs without breaking the existing relationships (Manufacturer/Owner) stored in the database.

🛡️ Testing & Quality
I take code quality seriously.

Backend: I implemented comprehensive Unit Tests using JUnit 5 and Mockito.

Result: The JaCoCo report confirms 100% code coverage for Models and Controllers.

Frontend: Basic component rendering and state handling are tested using Jest and React Testing Library.

To run backend tests manually (if you have Java installed):

Bash

./mvnw clean test
./mvnw jacoco:report
💡 Database Schema
The data is structured in PostgreSQL with the following relationships:

Table autok: The main entity.

Table gyarto: One-to-Many relationship (One manufacturer -> Many cars).

Table tulajdonos: One-to-Many relationship (One owner -> Many cars).

👨‍💻 Author
Built by Sebastian. Feel free to fork this project or reach out if you have any questions about the architecture!
