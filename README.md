# QuestSearch

QuestSearch is a search application that allows users to search through a database of questions. It features filtering by question type (e.g., MCQs, Anagrams, Read Along), pagination, and real-time search results. The backend uses gRPC for efficient communication with the frontend.

## Features

-   Real-time search with autocomplete suggestions.
-   Filtering questions by type (MCQ, Anagram, Read Along, etc.).
-   Pagination for easy navigation through large datasets.
-   Responsive design for use on all device sizes.

## Technologies Used

-   **Frontend**: React, React Bootstrap
-   **Backend**: Node.js
-   **Communication**: gRPC
-   **Database**: MongoDB
-   **API Documentation**: Protocol Buffers, gRPC-web

## Requirements

-   **Node.js**: v14.0.0 or higher
-   **MongoDB**: A running MongoDB instance
-   **Docker** (optional for local testing with gRPC)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Shubham-111122/QuestSearch.git
cd QuestSearch
```

### 2. Backend Setup (Node.js or GoLang)

-   Navigate to the `backend` directory and install dependencies:

#### For Node.js:

```bash
cd backend
npm install
nodemon server.js
```

Create a .env file for configuration (e.g., MongoDB URI, server details).

### 3. Frontend Setup (React)

-   Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
npm start
```

### 4. Running the Project with Docker

To run the entire project using Docker, follow these steps:

1. Ensure you have Docker installed on your machine.

2. Build and start the container in the root folder:

    ```bash
    docker build -t envoy-server .
    docker run -d --name envoy-server -p 8080:8080 -p 50051:50051 envoy-server
    ```

### 5. Enhancements & Unique Features

1. Search Functionality
   The frontend provides a search bar for querying questions based on titles. Results are dynamically displayed with pagination and filtering based on question types.

2. Pagination
   The result page supports pagination with next and previous buttons, making it easier to browse through large datasets.

3. Filters
   The search results can be filtered based on question types such as "Anagram", "MCQ", "Read Along", and more.
