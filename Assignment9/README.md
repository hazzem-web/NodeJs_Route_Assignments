# 📝 Notes Management System API

A RESTful API for managing personal notes — built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. Features JWT-based authentication, full CRUD operations, pagination, sorting, Mongoose aggregation pipelines, and strict owner-based access control.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | JWT (jsonwebtoken) |
| Password Hashing | bcrypt |

---

## 📁 Project Structure

```
src/
├── database/
│   ├── models/
│   │   ├── note.model.js        # Note schema (title, content, userID, timestamps)
│   │   └── user.model.js        # User schema (name, email, password, phone, age)
│   └── connection.js            # Mongoose connection
├── modules/
│   ├── notes/
│   │   ├── note.controller.js   # All note routes
│   │   └── note.service.js      # Note business logic
│   └── users/
│       ├── user.controller.js   # All user routes
│       └── user.service.js      # User business logic
├── app.controller.js            # Express app setup + route registration
└── main.js                      # Entry point
```

---

## ⚙️ Environment Variables

Create a `config/env.service.js` file and export the following:

```js
export const databaseUri = 'mongodb://localhost:27017/notes-db';
export const secret      = 'your_jwt_secret';
export const envSalt     = '10'; // bcrypt salt rounds
export const port        = 3000;
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/notes-management-system.git
cd notes-management-system

# 2. Install dependencies
npm install

# 3. Configure your environment variables
# Edit config/env.service.js with your values

# 4. Start the server
node src/main.js
```

Server runs on **http://localhost:3000**

---

## 📌 API Endpoints

### 👤 Users — `/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and get a JWT token |
| GET | `/get-user` | Get current user's profile |
| PATCH | `/update-user` | Update user info (requires password confirmation) |
| DELETE | `/delete-user` | Delete current user's account |

**POST `/signup` — Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "01012345678",
  "age": 25
}
```

**POST `/login` — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**POST `/login` — Response:**
```json
{
  "message": "user logged in successfully",
  "token": "<JWT_TOKEN>"
}
```

> 🔐 All other endpoints require the JWT token in the `authorization` header.

---

### 📝 Notes — `/notes`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/add-note` | Create a new note | ✅ |
| GET | `/get-note?noteID=` | Get a specific note by ID | ✅ |
| GET | `/user-notes` | Get all notes for the logged-in user | ✅ |
| GET | `/paginate-sort?page=&limit=` | Get paginated notes sorted by newest | ✅ |
| GET | `/aggregate?title=` | Aggregate notes by title with user info | ✅ |
| PATCH | `/update-note?noteID=` | Partially update a note | ✅ |
| PUT | `/replace-note?noteID=` | Fully replace a note | ✅ |
| PATCH | `/update-all` | Update all notes' titles for the user | ✅ |
| DELETE | `/delete-note?noteID=` | Delete a specific note | ✅ |
| DELETE | `/delete-user-notes` | Delete all notes for the logged-in user | ✅ |

**POST `/add-note` — Request Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

**PATCH `/update-note?noteID=<id>` — Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

**GET `/paginate-sort?page=1&limit=5`** — Returns notes sorted by `createdAt` descending.

**GET `/aggregate?title=My Note`** — Returns matching notes joined with user info (name + email) via MongoDB aggregation pipeline.

---

## 🗄️ Database Models

### User
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| email | String | Required, Unique |
| password | String | Required, bcrypt hashed |
| phone | String | Required |
| age | Number | Required, min: 18, max: 60 |
| createdAt / updatedAt | Date | Auto (timestamps) |

### Note
| Field | Type | Notes |
|---|---|---|
| title | String | Required, cannot be fully uppercase |
| content | String | Required |
| userID | ObjectId | FK → User (ref: `users`) |
| createdAt / updatedAt | Date | Auto (timestamps) |

---

## 🔗 Model Relationships

```
User ──< Note
```

- A **User** can have many **Notes**
- Each **Note** belongs to one **User** via `userID`
- Notes are populated with user email via Mongoose `.populate()`
- Aggregation pipeline uses `$match` → `$lookup` → `$unwind` → `$project`

---

## 🎯 Core Features

- ✅ User registration with **bcrypt** password hashing
- ✅ JWT-based login with **1-day token expiry**
- ✅ Owner-based access control — users can only access their own notes
- ✅ Custom Mongoose validator — note title **cannot be fully uppercase**
- ✅ Full CRUD on notes (create, read, update, replace, delete)
- ✅ **Bulk update** — update all note titles at once via `updateMany`
- ✅ **Bulk delete** — delete all user notes at once via `deleteMany`
- ✅ **Pagination + sorting** — skip/limit with newest-first order
- ✅ **MongoDB Aggregation Pipeline** — `$match`, `$lookup`, `$unwind`, `$project`
- ✅ Populate user email on note queries via `.populate()`
- ✅ Global error handler middleware

---

## 🔐 Authentication

All protected routes expect the JWT token in the request header:

```
authorization: <your_token_here>
```

Token is returned on successful login and expires after **1 day**.

---

## 📋 Notes

- Age validation is enforced at the model level (18–60).
- Note title validation rejects fully uppercased titles (e.g. `"MY NOTE"` ❌).
- `update-user` requires the current password for confirmation before applying changes.
- The `aggregate` endpoint uses a native MongoDB pipeline for advanced querying with joined user data.

