
# Personal Finance Management Application (PFMA)

The **Personal Finance Management Application (PFMA)** is a simple, intuitive tool designed to help users manage their finances effectively. Users can add, view, and delete transactions, monitor income and expenses, and get a summary of their financial health.

The project is implemented in two distinct architecture styles:
1. **Client-Server Architecture using Flask** as the backend.
2. **Event-Based Architecture using Firebase** as a real-time event bus and database.

This README provides details on each architecture, setup, and execution instructions for both.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture Styles](#architecture-styles)
  - [Client-Server Architecture](#client-server-architecture)
  - [Event-Based Architecture](#event-based-architecture)
- [Setup and Execution](#setup-and-execution)
  - [Client-Server Architecture Setup (Flask)](#client-server-architecture-setup-flask)
  - [Event-Based Architecture Setup (Firebase)](#event-based-architecture-setup-firebase)
- [File Structure](#file-structure)

---

## Project Overview

The PFMA allows users to:
- **Track Transactions:** Add new transactions with date, amount, and optional notes.
- **View Financial Summary:** See total income, expenses, and net balance.
- **Manage Transactions:** Edit or delete transactions as needed.

---

## Architecture Styles

### Client-Server Architecture

In the **client-server architecture**, the application is split into:
1. **Frontend:** A React application that manages the user interface.
2. **Backend:** A Flask API server that manages data storage and business logic. It receives requests from the frontend and performs CRUD operations on transaction data stored in a dictionary (for simplicity, an in-memory database).

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

## Setup and Execution

### Client-Server Architecture Setup (Flask)

#### Prerequisites
- Python 3.8 or higher
- Node.js and npm

#### Step 1: Backend Setup (Flask)

1. **Navigate to the Backend Folder**:
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install flask flask-cors
   ```

4. **Create `app.py`** (backend code for the Flask server).

5. **Run the Backend Server**:
   ```bash
   python app.py
   ```

The server should now be running at `http://127.0.0.1:5000`.

#### Step 2: Frontend Setup (React)

1. **Navigate to the Frontend Folder**:
   ```bash
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
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Firebase**:
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
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.js         # Dashboard with summary and recent transactions
│   │   ├── Dashboard.css        # Styling for Dashboard component
│   │   ├── TransactionForm.js    # Form to add new transactions
│   │   ├── TransactionForm.css  # Styling for TransactionForm component
│   │   ├── TransactionList.js   # Displays the list of all transactions
│   │   └── TransactionList.css  # Styling for TransactionList component
│   ├── firebase.js              # Firebase configuration for event-based architecture
│   ├── App.js                   # Main application file with routing
│   └── index.js                 # Entry point for React
└── public/
```

---

## Project Summary

This project demonstrates two approaches to building a finance management tool:

1. **Client-Server Architecture**: Uses a Flask backend to handle requests and store data, with a React frontend making HTTP requests to the backend.
2. **Event-Based Architecture**: Uses Firebase as an event bus and database, enabling real-time updates with minimal backend code. React interacts directly with Firebase Firestore for storage and synchronization.

Both setups allow for tracking financial transactions, managing a summary view, and modifying transaction data. Each architecture style offers unique advantages:
- **Client-Server Architecture**: Useful for applications requiring complex business logic on the server side.
- **Event-Based Architecture**: Ideal for real-time, scalable applications that need instant updates across all clients.
