# 📚 Books Collection API

A RESTful API built with **Node.js**, **Express**, and the **native MongoDB driver** — no ORM. Covers advanced MongoDB operations including aggregation pipelines, capped collections, indexing, `$lookup` joins, filtering, pagination, and bulk operations across three collections: **Books**, **Authors**, and **Logs**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| Driver | mongodb (Native Driver) |

---

## 📁 Project Structure

```
Assignment8/
└── src/
    ├── database/
    │   ├── models/
    │   │   ├── author.model.js    # authors collection
    │   │   ├── book.model.js      # books collection (with schema validator)
    │   │   └── log.model.js       # logs collection (capped)
    │   └── connection.js          # MongoClient connection + db export
    ├── modules/
    │   ├── books/
    │   │   ├── book.controller.js # All book routes
    │   │   └── book.service.js    # Book business logic
    │   └── collections/
    │       ├── authors/
    │       │   ├── author.controller.js
    │       │   └── author.service.js
    │       └── logs/
    │           ├── log.controller.js
    │           └── log.service.js
    ├── app.controller.js          # Express app setup + route registration
    └── main.js                    # Entry point
```

---

## ⚙️ Environment Variables

Create a `config/env.service.js` file and export the following:

```js
export const databaseUri  = 'mongodb://localhost:27017';
export const databaseName = 'your_db_name';
export const port         = 3000;
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/books-collection-api.git
cd books-collection-api/Assignment8

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

### 📖 Books — `/books`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/index` | Create an ascending index on `title` field |
| POST | `/add-one-book` | Insert a single book |
| POST | `/add-many-books` | Bulk insert 3 predefined books |
| PATCH | `/update-future-book` | Update the year of the "Future" book to 2022 |
| GET | `/get-brave-book?title=` | Find a book by title |
| GET | `/get-books-year?from=&to=` | Get books published between two years |
| GET | `/get-genres?genres=` | Get books by genre |
| GET | `/skip-limit` | Get books sorted by year (desc), skip 2, limit 3 |
| GET | `/year-integar` | Get books where `year` is of type Number |
| GET | `/exclude-genres` | Get books excluding Horror & Science Fiction |
| DELETE | `/delete-prev-years?year=` | Delete all books published on or before a year |
| GET | `/aggregate1` | Books published after 2000, sorted by year desc |
| GET | `/aggregate2` | Books after 2000, excluding `_id` and `genres` |
| GET | `/aggregate3` | Unwind genres — one document per genre per book |

**POST `/add-one-book` — Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "genres": ["Programming", "Software Engineering"]
}
```

**GET `/get-books-year?from=1990&to=2010`** — Returns all books published in that range.

**GET `/get-genres?genres=Fiction`** — Returns all books tagged with that genre.

**DELETE `/delete-prev-years?year=2000`** — Deletes all books with `year <= 2000`.

---

### 👤 Authors — `/collection/authors`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-author` | Insert a predefined author (`author1`, British) |

---

### 📋 Logs — `/collection/logs`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/capped` | Create a capped `logs` collection (max 5 docs, 1000 bytes) |
| POST | `/insert-log` | Insert a new log entry (book_id + action) |
| GET | `/aggregate4` | Join logs with books via `$lookup` on `book_id` |

**POST `/insert-log` — Request Body:**
```json
{
  "book_id": "<book_object_id>",
  "action": "borrowed"
}
```

**GET `/aggregate4`** — Converts `book_id` string to ObjectId using `$toObjectId`, then joins with the `books` collection to return log + book details.

---

## 🗄️ Collections

### books
| Field | Type | Notes |
|---|---|---|
| title | String | Required, schema validated |
| author | String | - |
| year | Number | - |
| genres | Array | List of genre strings |

> Collection is created with a MongoDB schema validator enforcing `title` is a non-empty string.

### authors
| Field | Type | Notes |
|---|---|---|
| name | String | - |
| nationality | String | - |

### logs (Capped Collection)
| Field | Type | Notes |
|---|---|---|
| book_id | String / ObjectId | References a book |
| action | String | e.g. `"borrowed"`, `"returned"` |

> Capped collection: max **5 documents**, max size **1000 bytes** — oldest docs auto-deleted when full.

---

## 🎯 Core Features

- ✅ **Native MongoDB driver** — no Mongoose, direct driver usage
- ✅ **Schema validator** on books collection (MongoDB-level validation)
- ✅ **Index creation** on `title` field for optimized queries
- ✅ **Bulk insert** via `insertMany`
- ✅ **Range queries** using `$gte` / `$lte` on year
- ✅ **Array field filtering** on `genres` with `$nin` exclusion
- ✅ **Pagination** — `.sort()`, `.skip()`, `.limit()`
- ✅ **Type filtering** — filter books where `year` is of type Number
- ✅ **Bulk delete** via `deleteMany` with condition
- ✅ **3 Aggregation Pipelines** on books (`$match`, `$sort`, `$project`, `$unwind`)
- ✅ **Capped collection** for logs with auto-rotation (max 5 docs)
- ✅ **Cross-collection `$lookup`** — logs joined with books using `$toObjectId` conversion
- ✅ Global error handler middleware

---

## 🔍 Aggregation Pipelines Summary

| Pipeline | Stages | What it does |
|---|---|---|
| `aggregate1` | `$match` → `$sort` | Books after year 2000, sorted newest first |
| `aggregate2` | `$project` → `$match` | Books after 2000, hide `_id` and `genres` |
| `aggregate3` | `$project` → `$unwind` | Flatten genres array — one row per genre |
| `aggregate4` (logs) | `$addFields` → `$lookup` | Convert `book_id` to ObjectId, join with books |
