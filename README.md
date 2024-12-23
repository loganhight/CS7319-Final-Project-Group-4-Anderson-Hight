
# Personal Finance Management Application (PFMA)

The **Personal Finance Management Application (PFMA)** is a simple, intuitive tool designed to help users manage their finances effectively. Users can add, view, and delete transactions, monitor income and expenses, and get a summary of their financial health.

The project is implemented in two distinct architecture styles:

1. **Client-Server Architecture using Flask** as the backend with MySQL as the database.
2. **Event-Based Architecture using Firebase** as a real-time event bus and database.

This README provides details on each architecture, setup, and execution instructions for both.

---

## Table of Contents

- [Project Overview](#project-overview)
  - [Changes from Proposal](#changes-from-proposal)
- [Architecture Styles](#architecture-styles)
  - [Client-Server Architecture](#client-server-architecture)
  - [Event-Based Architecture](#event-based-architecture)
  - [Final Selection and Rationale](#final-selection-and-rationale)
- [Setup and Execution](#setup-and-execution)
  - [Implementation Platfrom](#implementation-platform)
  - [Client-Server Architecture Setup (Flask)](#client-server-architecture-setup-flask)
  - [Event-Based Architecture Setup (Firebase)](#event-based-architecture-setup-firebase)
- [File Structure](#file-structure)
- [Project Summary](#project-summary)

---

## Project Overviews

The PFMA allows users to:

- **Track Transactions:** Add new transactions with date, amount, and optional notes.
- **View Financial Summary:** See total income, expenses, and net balance.
- **Manage Transactions:** Edit or delete transactions as needed.

---

### Changes from Proposal

In our project proposal, we initially chose Client-Sever and Blackboard as our two candidate architecture styles. However, upon further analysis, we decided to switch the Blackboard archtecture style for the Event-Based archiecture style. The rationale for this change is that the Event-Based architecture style better supports scalability by adding new event producers or consumers, without requiring major changes to the system. On the other hand, scaling in the Blackboard architecture style requires careful management of available resources and often leads to resource contention and bottlenecks. Additionally, the Event-Based architecture style enables higher performance, responsiveness, and real-time updates and notifications. Finally, maintenance is easier in the Event-Based architecture style as components can be added, removed, and edited independently as long as they adhere to the event schema. In the Blackboard architecture style, changes to the blackboard or to a component may require updates across the system to ensure that consistency is maintaned.

---

## Architecture Styles

### Client-Server Architecture

In the **client-server architecture**, the application is split into:

1. **Frontend:** A React application that manages the user interface.
2. **Backend:** A Flask API server that manages data storage and business logic. It connects to a **MySQL database** for persistent data storage, which can be managed using MySQL Workbench.

In this architecture:

- The React frontend sends HTTP requests to the Flask backend.
- The Flask server processes requests and sends responses back to the frontend.
- The backend performs the financial calculations and returns the results to the frontend.

---

### Event-Based Architecture

In the **event-based architecture**, **Firebase** acts as the backend, handling both real-time data storage and synchronization. Firebase Firestore is used for transaction storage, while Firestore's `onSnapshot` listeners allow real-time updates across all connected clients.

In this architecture:

- Firebase Firestore is used as a real-time database.
- Firebase provides real-time data synchronization, so when data changes, all clients receive the updates automatically.
- React components connect directly to Firebase Firestore, bypassing the need for a traditional server.

---

### Final Selection and Rationale

**Selected Architecture:** Client-Server

**Rationale:**

- Control Over Data and Logic: The server-based architecture allows full control over backend processing, data storage, and security, offering greater customization.
- Data Security and Compliance: Storing data in a centralized MySQL database enhances data protection and supports stricter access controls.
- Scalability: The architecture can scale horizontally or vertically as demand grows by adding server instances or database replicas.
- Cost Efficiency: Client-server architecture often has lower recurring costs than cloud-hosted event-based systems, especially for moderate traffic applications.
- Established Tech Stack: Using widely adopted technologies like Flask and MySQL ensures stable performance, strong community support, and extensive documentation.

---

## Setup and Execution

### Implementation Platform

Platform: **Visual Studio Code**

- Download: [VSCode](https://code.visualstudio.com/)

- **Installation:**
   - Follow installation steps for Windows, macOS, or Linux.

- **Configuration:**

   1. Clone the repository:

      ```bash
      git clone <repository_url>
      ```

   2. Install dependencies:

      - For React:

      ``` bash
      npm install
      ```

      - For Python:

      ```bash
      pip install -r requirements.txt
      ```

- Run according to following instructions for each architecture style.

---

### Client-Server Architecture Setup (Flask)

#### Prerequisites

- Python 3.8 or higher
- MySQL Server and MySQL Workbench
- Node.js and npm

#### Step 1: Database Setup (MySQL)

1. Open **MySQL Workbench** and create a new database:

   ```sql
   CREATE DATABASE pfma_db;
   ```

2. Use the newly created database:

   ```sql
   USE pfma_db;
   ```

3. Create the `transactions` table:

   ```sql
   CREATE TABLE transactions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       date DATE NOT NULL,
       amount DECIMAL(10, 2) NOT NULL,
       notes TEXT
   );
   ```

#### Step 2: Backend Setup (Flask)

1. **Navigate to the Backend Folder**:

   ```bash
   cd Selected
   cd backend
   ```

2. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install flask flask-cors mysql-connector-python
   ```

4. **Update `app.py`**: Make sure the MySQL connection details (username, password, database) are correctly configured.

5. **Run the Backend Server**:

   ```bash
   python app.py
   ```

The server should now be running at `http://127.0.0.1:5000` and connected to the MySQL database.

#### Step 3: Frontend Setup (React)

1. **Navigate to the Frontend Folder**:

   ```bash
   cd Selected
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Update the API URLs in the Frontend** (in the `Dashboard.js`, `TransactionList.js`, and `TransactionForm.js` files) to point to `http://127.0.0.1:5000/api`.

4. **Run the Frontend**:

   ```bash
   npm start
   ```

The application should now be running at `http://localhost:3000`. You can navigate between the dashboard, add transaction form, and transaction list.

---

### Event-Based Architecture Setup (Firebase)

#### Prerequisites

- Firebase Project
- Node.js and npm

#### Step 1: Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., "PFMA Project").
3. In the Firebase project, enable **Firestore Database** and **Authentication** if needed.
4. Add a **Web App** to the Firebase project, and copy the Firebase configuration (API key, authDomain, etc.).

#### Step 2: Frontend Setup (React)

1. **Navigate to the Frontend Folder**:

   ```bash
   cd Unselected
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Install React Router Dom**:

   ```bash
   npm install react-router-dom
   ```

4. **Install Firebase**:

   ```bash
   npm install firebase
   ```

4. **Create `firebase.js`**:
   In the `src` folder, create a `firebase.js` file with the Firebase configuration:

   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

5. **Update the Frontend Components**:
   In the `Dashboard.js`, `TransactionList.js`, and `TransactionForm.js` files, replace the Flask API calls with Firebase Firestore functions to add, delete, and retrieve transactions in real-time.

6. **Run the Frontend**:

   ```bash
   npm start
   ```

The application should now be running at `http://localhost:3000`. Changes in transactions will reflect in real-time across all connected clients.

---

## File Structure

```
PFMA_Project/
├── Selected/                      # Client-Server Architecture implementation
├── Unselected/                    # Event-Based Architecture implementation
├── README.md                      # Overall project documentation
├── .gitignore                     # Git ignore file for excluding unnecessary files from version control
```

### Selected (Client Server)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.js          # Dashboard with financial summary and recent transactions
│   │   ├── Dashboard.css         # Styling for Dashboard component
│   │   ├── TransactionForm.js    # Form to add new transactions
│   │   ├── TransactionForm.css   # Styling for TransactionForm component
│   │   ├── TransactionList.js    # Displays the list of all transactions
│   │   └── TransactionList.css   # Styling for TransactionList component
│   ├── App.js                    # Main application file with routing
│   └── index.js                  # Entry point for React application
├── public/                       # Static assets for the frontend
│   ├── index.html                # Main HTML template for React
│   └── favicon.ico               # Favicon for the application
└── package.json                  # Project metadata and dependencies

backend/
├── app.py                        # Flask application with API routes
├── database.sql                  # SQL file defining the database schema
└── insert_script.py              # Python script to insert sample data into the database
```

### Unselected (Event-Based)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.js          # Dashboard with summary and recent transactions
│   │   ├── Dashboard.css         # Styling for Dashboard component
│   │   ├── TransactionForm.js    # Form to add new transactions
│   │   ├── TransactionForm.css   # Styling for TransactionForm component
│   │   ├── TransactionList.js    # Displays the list of all transactions
│   │   └── TransactionList.css   # Styling for TransactionList component
│   ├── firebase.js               # Firebase configuration for event-based architecture
│   ├── App.js                    # Main application file with routing
│   └── index.js                  # Entry point for React
├── public/                       # Static assets for the frontend
│   ├── index.html                # Main HTML template for React
│   └── favicon.ico               # Favicon for the application
└── package.json                  # Project metadata and dependencies
```

---

## Project Summary

This project demonstrates two approaches to building a finance management tool:

1. **Client-Server Architecture**: Uses a Flask backend connected to a MySQL database to handle requests and store data. The React frontend communicates with the Flask backend via HTTP requests.
2. **Event-Based Architecture**: Uses Firebase as an event bus and database, enabling real-time updates with minimal backend code. React interacts directly with Firebase Firestore for storage and synchronization.

Both setups allow for tracking financial transactions, managing a summary view, and modifying transaction data. Each architecture style offers unique advantages:

- **Client-Server Architecture**: Useful for applications requiring complex business logic on the server side.
- **Event-Based Architecture**: Ideal for real-time, scalable applications that need instant updates across all clients.

However, ultimately we selected Client-Server as our final architecture style due to the benefits detailed above.
