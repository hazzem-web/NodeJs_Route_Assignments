# 🌐 Pure Node.js HTTP Server — User Management

A user management server built with **zero frameworks** — only Node.js built-in `http` and `fs` modules. Handles full CRUD operations manually using raw HTTP request parsing, streaming chunks, and JSON file persistence. Also includes a written study on core Node.js internals.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| HTTP Server | Built-in `http` module (no Express) |
| Storage | JSON file (`data.json`) |
| File I/O | Built-in `fs` module |

---

## 📁 Project Structure

```
Assignment3/
├── data.json    # JSON file acting as the database
├── essay.txt    # Study notes on Node.js internals
└── index.js     # HTTP server + all route handlers
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/nodejs-http-server.git
cd nodejs-http-server/Assignment3

# 2. No dependencies needed — pure Node.js
node index.js
```

Server runs on **http://localhost:3037**

---

## 📌 API Endpoints

> ⚠️ No Express — routing is handled manually via `url` and `method` checks inside `http.createServer`.

| Method | URL | Description |
|---|---|---|
| POST | `/add-user` | Add a new user |
| PATCH | `/update-user` | Update user name by ID |
| DELETE | `/delete-user` | Delete a user by ID |
| GET | `/get-users` | Get all users |
| POST | `/get-user-by-id` | Get a single user by ID |

---

### Request & Response Format

> All request bodies are sent as raw JSON. Data is read via `req.on('data')` chunks and parsed manually.

**POST `/add-user` — Request Body:**
```json
{
  "id": 7,
  "name": "Ahmed",
  "age": 22,
  "email": "ahmed@example.com",
  "city": "Cairo"
}
```

> All fields are required. Duplicate emails are rejected.

**PATCH `/update-user` — Request Body:**
```json
{
  "id": 1,
  "name": "New Name"
}
```

**DELETE `/delete-user` — Request Body:**
```json
{
  "id": 3
}
```

**POST `/get-user-by-id` — Request Body:**
```json
{
  "id": 2
}
```

---

## 🗄️ Data Storage

Users are stored in `data.json` and loaded once at server start via `fs.readFileSync`. All mutations are persisted back using `fs.writeFileSync`.

**User fields:**

| Field | Type | Notes |
|---|---|---|
| id | Number | Manually provided |
| name | String | Required |
| age | Number | Required |
| email | String | Required, must be unique |
| city | String | Required |

---

## 🎯 Core Features

- ✅ **Pure Node.js** — zero dependencies, no Express or any framework
- ✅ **Manual routing** — URL + method matching inside `http.createServer`
- ✅ **Streaming request body** — data read via `req.on('data')` + `req.on('end')`
- ✅ **Email uniqueness check** on add
- ✅ **JSON file persistence** — all changes written via `fs.writeFileSync`
- ✅ **res.write + res.end** pattern for raw HTTP responses

---

## 📖 Node.js Internals — Study Notes (`essay.txt`)

This assignment includes a written study covering the following concepts:

### 1. Event Loop
Categorizes code into 3 priority levels:
- **Timers** — `setTimeout`, `setInterval`, `setImmediate`
- **Long-running I/O** — File system, crypto
- **OS operations** — HTTP server

Executes all operations in a **Non-Blocking** manner.

### 2. Libuv
A pure C++ library responsible for:
- Async I/O operations
- File system handling
- Thread pool management

### 3. How Node.js Handles Async
- **V8** compiles JS code to C++ and sends it to **libuv**
- **libuv** handles async operations at a low level, accessing memory and I/O directly

### 4. Core Concepts

| Concept | Description |
|---|---|
| Call Stack | Order of operations — **LIFO** (Last In, First Out) |
| Event Queue | Priority queue of async callbacks — **FIFO** (First In, First Out) |
| Event Loop | Coordinates sync/async execution with libuv and V8 |

### 5. Thread Pool
- Simulates parallel programming in JavaScript
- Runs **4 threads** in one process by default
- Configurable via `UV_THREADPOOL_SIZE` environment variable

### 6. Blocking vs Non-Blocking

| Type | Behavior |
|---|---|
| **Blocking** | JS waits line-by-line until the operation finishes (synchronous) |
| **Non-Blocking** | JS continues executing other code while the operation runs (asynchronous via Event Loop) |
