# Tria React Assignment: Contact List

This project is a simple, modern contact list application built with React. It allows users to view, search, and add contacts.

**[Link to your deployed Vercel URL here]**

---

## How to Set Up and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd tria-contact-list
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Assumptions & Design Choices

[cite_start]The assignment description intentionally left several details open to interpretation. Here are the choices I made:

* **State Management:** I used React's built-in `useState`, `useEffect`, and `useMemo` hooks. This is a clean, modern approach for an application of this scale without needing external libraries.
* [cite_start]**Component Structure:** I separated logic into distinct components (`ContactList`, `ContactCard`, `SearchBar`, `AddContactForm`) to demonstrate good component design  and reusability. `App.jsx` serves as the main "container" component, managing state and logic.
* [cite_start]**API Interaction:** Instead of just hardcoding an array in the UI, I created a `mockData.js` file. In `App.jsx`, I use a `useEffect` with a `setTimeout` to *simulate* an asynchronous API call.
* [cite_start]**Handling Ambiguity:**
    * **Loading State:** A "Loading..." message appears for 1 second on mount to simulate a network request.
    * **Empty State (Search):** If a search yields no results, a specific message "No contacts found for..." is displayed.
    * **Empty State (Initial):** If the contact list is empty, a "No contacts to display" message is shown.
* **Filtering Logic:** Filtering is case-insensitive and handled in `App.jsx`. The `useMemo` hook is used to optimize performance by ensuring the list is only re-filtered when the `contacts` or `searchTerm` change.
* [cite_start]**Optional Feature:** I implemented the "Add a new contact" feature[cite: 7]. The form uses its own state, and on submit, it calls a function passed down from `App.jsx` to update the master contact list. New contacts are given a unique ID using `Date.now()`.

## Libraries Used

* [cite_start]**React:** Required by the assignment.
* **Vite:** Chosen as the build tool for its extremely fast setup and Hot Module Replacement (HMR).
* [cite_start]**No other auxiliary libraries [cite: 13] were needed.** I chose to demonstrate proficiency with core React hooks rather than pulling in external state management or utility libraries for a project of this size.