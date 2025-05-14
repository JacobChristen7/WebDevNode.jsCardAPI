# Collectible Card Game API

This project is an Express.js API server for a fictional collectible card game that I made for a school assignment. The server handles authentication, CRUD operations for cards, and token-based authorization.

---

## **Features**

### **Authentication**
- `/getToken` endpoint:
  - Accepts a username and password.
  - Validates credentials against a `users.json` file.
  - Returns a JSON Web Token (JWT) upon successful authentication.
  - Returns a `401 Unauthorized` status code with an error message if authentication fails.

### **Card Management**
- `/cards` endpoint:
  - Retrieve all cards with optional query parameters for filtering (e.g., `?set=Base%20Set&type=Creature&rarity=Common`).
  - Filtering supports equality matches.

- `/cards/create` endpoint:
  - Creates a new card using information from the request body.
  - Ensures card IDs are unique.
  - Protected by JWT authentication.

- `/cards/:id` (PUT) endpoint:
  - Updates an existing card using the ID in the request params and the request body.
  - Ensures card IDs are unique.
  - Protected by JWT authentication.

- `/cards/:id` (DELETE) endpoint:
  - Deletes a card using the ID in the request params.
  - Protected by JWT authentication.

### **File Operations**
- Card data is stored in `cards.json`.
- File operations ensure data integrity and persist changes.

### **Authentication Middleware**
- Middleware validates incoming JWT tokens for protected routes.
- Responds appropriately to unauthorized requests.
- JWT signing secret is stored in a `.env` file (not included in the Git repository).

### **Error Handling**
- Global error-handling middleware:
  - Returns `401 Unauthorized` for invalid tokens.
  - Returns appropriate `400`-level status codes for invalid client requests.
  - Returns `500 Internal Server Error` for server errors.
  - Includes descriptive error messages in all cases.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd [WebDevNode.jsCardGame]
```
### **2. Install Dependencies**
```bash
npm install
```
### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```bash
JWT_SECRET=your-secret-key # Replace with your jwt token
```

### **4. Start the Server**
```bash
node server.js