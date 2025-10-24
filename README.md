# My Contact List - Full Stack MERN Application

## Vercel deployed app link: [**https://my-contact-list-nu.vercel.app/**](https://my-contact-list-nu.vercel.app/)

This is a complete full-stack contact management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a secure, multi-user environment where users can register, log in, and manage their own private list of contacts.

The application features a modern, responsive frontend with advanced features like real-time search, layout toggling, and a light/dark mode theme.

### [**Live Demo on Vercel**](https://my-contact-list-nu.vercel.app/)

## Features

### Frontend (Client-Side)

  * **Secure Authentication:** Full user registration and login system.
  * **JWT Session Management:** Uses JSON Web Tokens (JWT) for managing user sessions. The token is stored and sent with all API requests.
  * **Global Auth State:** `AuthContext` provides global authentication state to the entire React application.
  * **Protected Routes:** The main contacts page is a private route, redirecting unauthenticated users to the login page.
  * **Contact CRUD:** Full Create, Read, and Delete functionality for contacts.
  * **Modal Form:** Contacts are added via a sleek modal form.
  * **Dynamic Search:** A single search bar filters contacts in real-time by both **Name** and **Phone Number**.
  * **Light/Dark Mode Toggle:** A smooth slider toggle to switch between light and dark themes. The user's preference is saved in `localStorage`.
  * **Layout Toggle:** A segmented control button to instantly switch the contact view between a responsive **Grid Layout** and a compact **List Layout**. This preference is also saved in `localStorage`.
  * **Responsive Design:** The UI is fully responsive and built with a modern, clean aesthetic using CSS variables.
  * **Frontend Error Handling:** Form validation and server-side error messages (e.g., "Invalid Credentials") are displayed to the user.

### Backend (Server-Side)

  * **RESTful API:** A full Node.js & Express.js API for handling authentication and contact operations.
  * **MongoDB Database:** Uses MongoDB Atlas for a cloud-hosted, persistent database.
  * **User-Specific Data:** All API routes are protected. A user can *only* fetch, create, or delete contacts associated with their own user ID.
  * **Password Hashing:** User passwords are never stored in plain text. They are securely hashed and salted using `bcryptjs`.
  * **Token-Based Authentication:** The `/api/auth/login` route validates user credentials and returns a signed JWT for session authorization.
  * **Private Route Middleware:** A custom `auth` middleware is used to verify the JWT on all protected API endpoints.

-----

## Tech Stack

  * **Frontend:** React, React Router, Axios, Vite
  * **Backend:** Node.js, Express.js
  * **Database:** MongoDB (with Mongoose)
  * **Authentication:** `jsonwebtoken` (JWT), `bcryptjs`
  * **Deployment:** Vercel

-----

## Local Setup & Installation

To run this project on your local machine, you will need to run the backend server and the frontend client in two separate terminals.

### Prerequisites

  * Node.js (v18 or newer)
  * npm
  * Git
  * A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

-----

### 1\. Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tria-contact-list.git
cd tria-contact-list

# 2. Navigate to the server directory
cd server

# 3. Install backend dependencies
npm install
```

**4. Create Environment File**

Create a file named `.env` inside the `/server` directory and add the following, replacing the placeholder values:

```.env
# Get your connection string from your MongoDB Atlas dashboard
MONGO_URI="mongodb+srv://your_db_user:your_db_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"

# Create a long, random, and secret string for signing tokens
JWT_SECRET="your_long_random_jwt_secret_string"
```

**5. Run the Backend Server**

```bash
npm run dev
```

Your backend API will now be running on `http://localhost:5000`.

-----

### 2\. Frontend Setup

```bash
# 1. Open a new terminal and navigate to the project's root folder
cd tria-contact-list

# 2. Install frontend dependencies
npm install
```

**3. Set API URL for Local Development**

For local development, you must tell the React app to talk to your local backend.

  * Open `src/context/AuthContext.jsx` (or `src/api.js` if you have it).

  * Find the `axios.create` line and change the `baseURL` to point to your local server:

    ```javascript
    // Change this:
    const api = axios.create({
      baseURL: '/api',
    });

    // To this:
    const api = axios.create({
      baseURL: 'http://localhost:5000/api',
    });
    ```

**4. Run the Frontend Client**

```bash
npm run dev
```

Your React application will now be running on `http://localhost:5173`. You can register a new user and start adding contacts.

> **Note:** Remember to change the `baseURL` back to `'/api'` before deploying to Vercel.

-----

## Deployment

This project is configured for a "monorepo-style" deployment on **Vercel**.

1.  Push your entire project (including the `server` folder) to a GitHub repository.
2.  Import the repository into Vercel.
3.  In the Vercel "Project Settings," add your `MONGO_URI` and `JWT_SECRET` as **Environment Variables**.
4.  The `vercel.json` file in the root directory will automatically:
      * Build the `/server` folder as a Node.js serverless function.
      * Build the root folder as a Vite (static) application.
      * Route all `/api/...` requests to the backend and all other requests to the React app.

-----

## Coding Approaches & Error Handling

### Frontend Architecture

  * **Component-Based:** The UI is broken into small, reusable components (e.g., `ContactCard`, `SearchBar`, `ThemeToggle`).
  * **State Management:**
      * **Local State (`useState`):** Used for component-level state, such as form inputs and modal visibility.
      * **Global State (`Context API`):** The `AuthContext` is used to manage the user's authentication token and status across the entire application, avoiding prop-drilling.
      * **Derived State (`useMemo`):** The search filtering logic is wrapped in `useMemo` to ensure it only re-calculates when the contact list or search term changes, optimizing performance.
  * **Routing:** `react-router-dom` handles client-side routing. This includes a `PrivateRoute` component that checks the `AuthContext` and protectively redirects unauthenticated users to the `/login` page.

### Error Handling

This application was built with robust error handling in mind.

1.  **Form Validation (Client-Side):**

      * The "Register" form checks if the "Password" and "Confirm Password" fields match.
      * The "Add Contact" form checks that all fields are filled.

2.  **API Errors (Server-Side):**

      * The `AuthContext` `login` and `register` functions are designed to `throw` any errors received from the API.
      * The `Login.jsx` and `Register.jsx` components `catch` these errors, store them in a local `error` state, and display a user-friendly message (e.g., "Invalid credentials" or "User already exists").

3.  **Authentication Errors (Runtime):**

      * The main data-fetching `useEffect` in `Contacts.jsx` is wrapped in a `try...catch` block.
      * If the API request for contacts fails with a `401 Unauthorized` status (meaning the JWT is invalid or expired), the user is automatically logged out and redirected to the `/login` page.

4.  **Render-Safe Logic:**

      * The search function includes a null-check (`contact.phone && ...`) to prevent the entire application from crashing if a contact record has no phone number.