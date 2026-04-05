# 🗨️ Social Platform API

A RESTful API for a simple social platform — built with **Node.js**, **Express**, **Sequelize ORM**, and **MySQL**. Supports users, posts, and comments with full relational associations, paranoid (soft) deletes, Sequelize hooks, upsert operations, bulk inserts, and `Op.like` search.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Sequelize |
| Database | MySQL |
| Driver | mysql2 |

---

## 📁 Project Structure

```
Assignment7/
└── src/
    ├── database/
    │   ├── models/
    │   │   ├── comment.model.js   # Comment schema (Class-based Model)
    │   │   ├── post.model.js      # Post schema (Class-based Model, paranoid)
    │   │   ├── relation.js        # All Sequelize associations
    │   │   └── user.model.js      # User schema (define-style, hooks + validators)
    │   └── connection.js          # Sequelize instance + connect + sync
    ├── modules/
    │   ├── comments/
    │   │   ├── comment.controller.js
    │   │   └── comment.service.js
    │   ├── posts/
    │   │   ├── post.controller.js
    │   │   └── post.service.js
    │   └── users/
    │       ├── user.controller.js
    │       └── user.service.js
    ├── app.controller.js          # Express app setup + route registration
    └── main.js                    # Entry point
```

---

## ⚙️ Environment Variables

Create a `config/env.service.js` file and export the following:

```js
export const databaseName     = 'your_db_name';
export const databaseUser     = 'your_db_user';
export const databasePassword = 'your_db_password';
export const databaseHost     = 'localhost';
export const databaseDialect  = 'mysql';
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/social-platform-api.git
cd social-platform-api/Assignment7

# 2. Install dependencies
npm install

# 3. Configure your environment variables
# Edit config/env.service.js with your DB credentials

# 4. Start the server
npm run start:dev
```

Server runs on **http://localhost:3000**

---

## 📌 API Endpoints

### 👤 Users — `/api/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/create-update/:userID` | Upsert a user (create or update) |
| GET | `/get-by-email?email=` | Find user by email |
| GET | `/get-by-id/:id` | Find user by ID (excludes role) |

**POST `/signup` — Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**POST `/create-update/:userID` — Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword",
  "role": "admin"
}
```

> Uses Sequelize `upsert()` — creates the user if not found, updates if exists.

---

### 📝 Posts — `/api/posts`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-post` | Create a new post |
| DELETE | `/delete-post/:postID` | Soft delete a post (paranoid) |
| GET | `/posts-details/:postID` | Get post with its user and comments |
| GET | `/posts-comments` | Get all posts with their comments |

**POST `/add-post` — Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is the content of my post.",
  "userID": 1
}
```

> Posts use **paranoid mode** — deleted posts are soft-deleted (`deletedAt` timestamp), not permanently removed.

---

### 💬 Comments — `/api/comments`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-comments` | Bulk create multiple comments |
| PATCH | `/update-comment/:commentID` | Update a comment (owner only) |
| POST | `/find-or-create` | Find existing comment or create new one |
| GET | `/search?word=` | Search comments by keyword |
| GET | `/newest/:postID` | Get the 3 newest comments on a post |
| GET | `/get-comment-details/:commentID` | Get comment with user and post info |

**POST `/add-comments` — Request Body:**
```json
[
  { "content": "Great post!", "userID": 1, "postID": 2 },
  { "content": "Totally agree.", "userID": 3, "postID": 2 }
]
```

> Uses Sequelize `bulkCreate()` — invalid entries (missing required fields) are filtered out before insert.

**POST `/find-or-create` — Request Body:**
```json
{
  "postID": 1,
  "userID": 2,
  "content": "Nice one!"
}
```

> Checks if the comment already exists before creating — returns existing or newly created comment.

**GET `/search?word=great`** — Uses Sequelize `Op.like` with `%word%` pattern to search comment content.

**GET `/newest/:postID`** — Returns the 3 most recent comments on a post, sorted by `createdAt` DESC.

---

## 🗄️ Database Models

### User
| Field | Type | Notes |
|---|---|---|
| userID | INTEGER | PK, Auto Increment |
| name | STRING | Required, min 3 chars (beforeCreate hook) |
| email | STRING | Required, Unique, email validated |
| password | STRING | Required, must be > 6 chars (custom validator) |
| role | ENUM | `user` \| `admin`, default: `user` |

### Post
| Field | Type | Notes |
|---|---|---|
| postID | INTEGER | PK, Auto Increment |
| title | STRING | Required |
| content | TEXT | Required |
| userID | INTEGER | FK → User |
| deletedAt | DATE | Auto (paranoid soft delete) |

### Comment
| Field | Type | Notes |
|---|---|---|
| commentID | INTEGER | PK, Auto Increment |
| content | TEXT | Required |
| postID | INTEGER | FK → Post |
| userID | INTEGER | FK → User |

---

## 🔗 Model Associations

```
User ──< Post ──< Comment
User ──<         Comment
```

| Association | Type | Cascade |
|---|---|---|
| User → Post | hasMany | CASCADE update + delete |
| Post → User | belongsTo | CASCADE update + delete |
| Post → Comment | hasMany | CASCADE update + delete |
| Comment → Post | belongsTo | CASCADE update + delete |
| User → Comment | hasMany | CASCADE update + delete |
| Comment → User | belongsTo | CASCADE update + delete |

---

## 🎯 Core Features

- ✅ **Sequelize ORM** with MySQL via `mysql2`
- ✅ **Class-based Models** (`extends Model`) for Post and Comment
- ✅ **Sequelize Hooks** — `beforeCreate` validates name length on User
- ✅ **Custom field validators** — email format + password length on User model
- ✅ **Paranoid (soft) delete** on Posts — `deletedAt` instead of hard delete
- ✅ **Upsert** via `userModel.upsert()` — create or update in one call
- ✅ **Bulk insert** via `commentModel.bulkCreate()` with pre-filter validation
- ✅ **FindOrCreate** logic — checks for duplicate before inserting
- ✅ **`Op.like` search** — keyword search across comment content
- ✅ **Eager loading** via `include` — posts with users and comments
- ✅ **`findAndCountAll`** — returns matching comments + total count
- ✅ **Sequelize auto-sync** on startup
- ✅ Global error handler middleware
