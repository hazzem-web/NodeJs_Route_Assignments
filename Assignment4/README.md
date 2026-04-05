# 👤 User Management API

A simple RESTful API for managing users — built with **Node.js** and **Express**, using a **JSON file as a database**. No external database required. Supports full CRUD operations with in-memory filtering and file persistence. Also includes an ERD diagram for a Music System as a separate design assignment.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express.js |
| Storage | JSON file (`data.json`) |
| File I/O | Node.js `fs` module |

---

## 📁 Project Structure

```
Assignment4/
├── ERD Diagram/
│   └── Assignment4Diagram.jpg   # ERD for a Music System (see below)
├── User/
│   ├── data.json                # JSON file acting as the database
│   ├── user.controller.js       # User routes
│   └── user.service.js          # User business logic + file I/O
├── index.js                     # Entry point + Express app setup
├── package.json
└── package-lock.json
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/user-management-api.git
cd user-management-api/Assignment4

# 2. Install dependencies
npm install

# 3. Start the server
node index.js
```

Server runs on **http://localhost:3000**

---

## 📌 API Endpoints

### 👤 Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-user` | Add a new user |
| PATCH | `/update-user/:id` | Update user name by ID |
| DELETE | `/delete-user/:id` | Delete a user by ID |
| GET | `/get-all-users` | Get all users |
| GET | `/get-user-by-id/:id` | Get a single user by ID |
| GET | `/get-user-by-name?name=` | Filter users by name |
| GET | `/filter-user-age?age=` | Filter users by minimum age |

**POST `/add-user` — Request Body:**
```json
{
  "name": "John Doe",
  "age": 25,
  "email": "john@example.com",
  "city": "Cairo"
}
```

> All fields are required. Duplicate emails are rejected.

**PATCH `/update-user/:id` — Request Body:**
```json
{
  "name": "New Name"
}
```

> Only updates the name. Returns a message if no changes detected.

**GET `/get-user-by-name?name=Hazzem`** — Returns all users matching that exact name.

**GET `/filter-user-age?age=20`** — Returns all users with age `>= 20`.

---

## 🗄️ Data Storage

Users are stored in `User/data.json`. The file is read on server start and written to on every create/update/delete operation using Node.js `fs.writeFileSync`.

**Sample record:**
```json
{
  "id": 1,
  "name": "Hazzem",
  "age": 20,
  "email": "hazzem.eljoker@gmail.com",
  "city": "Alex"
}
```

**User fields:**

| Field | Type | Notes |
|---|---|---|
| id | Number | Auto-incremented |
| name | String | Required |
| age | Number | Required |
| email | String | Required, must be unique |
| city | String | Required |

---

## 🎯 Core Features

- ✅ **Zero database setup** — JSON file used as persistent storage
- ✅ **Email uniqueness check** on user creation
- ✅ **No-change detection** on update — returns message if name is identical
- ✅ **Filter by name** — exact match across all users
- ✅ **Filter by minimum age** — returns users at or above the given age
- ✅ **File persistence** — all changes written to `data.json` via `fs.writeFileSync`
- ✅ **Auto ID generation** — based on current array length

---

## 🗺️ ERD Diagram — Music System

The `ERD Diagram/Assignment4Diagram.jpg` contains an Entity-Relationship Diagram for a Music platform with the following entities and relationships:

### Entities

| Entity | Attributes |
|---|---|
| Musician | ID (PK), Name, Address (Street, City, Ph.N) |
| Instrument | Name (PK), Musical Key |
| Album | ID (PK), Title, CR.Dt (Creation Date) |
| Song | Title (PK), Author |

### Relationships

| Relationship | Type | Description |
|---|---|---|
| Musician **Play** Instrument | M:M | A musician plays many instruments, an instrument is played by many musicians |
| Musician **Produce** Album | 1:M | One musician produces many albums |
| Musician **Perform** Song | M:M | Many musicians perform many songs |
| Album **Has** Song | 1:M | One album contains many songs |

> `Address` is a **composite attribute** on Musician, consisting of Street, City, and Phone Number.
