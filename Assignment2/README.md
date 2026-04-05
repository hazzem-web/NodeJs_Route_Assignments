# 🟢 Node.js Core Modules — Practice Exercises

A hands-on practice assignment covering **17 exercises** across Node.js built-in modules: `path`, `fs`, `events`, and `os`. Each exercise is implemented as a standalone commented function — uncomment to run.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Modules Used | `path`, `fs`, `events`, `os` |
| Dependencies | None |

---

## 📁 Project Structure

```
Assignment2/
├── data.json    # Sample JSON data used in fs exercises
├── index.js     # All 17 exercises (commented out individually)
└── newFolder/   # Created by the mkdir exercise (Q11)
```

---

## 🛠️ How to Run

```bash
# No installation needed — pure Node.js
# Uncomment the exercise you want to run, then:
node index.js
```

---

## 📋 Exercises Overview

### 🗂️ `path` Module (Q1 – Q9)

| # | Function | Description |
|---|---|---|
| Q1 | `func1()` | Print file path and its directory using `path.dirname` |
| Q2 | `func2(filePath)` | Extract the file name using `path.basename` |
| Q3 | `func3(obj)` | Build a full path from `{ dir, name, ext }` using `path.format` |
| Q4 | `func4(filePath)` | Get file extension using `path.extname` |
| Q5 | `func5(filePath)` | Parse a path and print `name` + `ext` using `path.parse` |
| Q6 | `func6(filePath)` | Check if a path is absolute using `path.isAbsolute` |
| Q7 | `func7(...seg)` | Join multiple path segments using `path.join` |
| Q8 | `func8(filePath)` | Resolve a relative path to absolute using `path.resolve` |
| Q9 | `func9(path1, path2)` | Merge two paths using `path.join` |

---

### 📁 `fs` Module (Q10 – Q11, Q14 – Q16)

| # | Function | Description |
|---|---|---|
| Q10 | `deleteFileAsync(file)` | Delete a file asynchronously using `fs.rm` |
| Q11 | `createFolderSync(path)` | Create a new folder synchronously using `fs.mkdirSync` |
| Q14 | `readFileS()` | Read `data.json` synchronously using `fs.readFileSync` |
| Q15 | `updateData()` | Read, parse, push a new entry, and write back to `data.json` using `fs.writeFile` |
| Q16 | `checkExist(filePath)` | Check if a path matches a known existing path |

---

### 📡 `events` Module (Q12 – Q13)

| # | Function | Description |
|---|---|---|
| Q12 | `startEvent()` | Register and emit a `start` event with a welcome message |
| Q13 | `loginEvent()` | Register and emit a `login` event with a username |

---

### 💻 `os` Module (Q17)

| # | Function | Description |
|---|---|---|
| Q17 | `getOsSpecification()` | Print OS platform and CPU architecture using `os.platform` + `os.arch` |

---

## 🗄️ Sample Data (`data.json`)

```json
[
  { "name": "Hazzem", "age": 20, "email": "hazzem.eljoker@gmail.com", "city": "Alex" },
  { "name": "Faris",  "age": 21, "email": "faris.eljoker@gmail.com",  "city": "Los_Angeles" },
  { "name": "Mohammed","age": 22,"email": "mohammed.eljoker@gmail.com","city": "Hurghada" },
  { "name": "ahmed",  "age": 21, "email": "ahmed.eljoker@gmail.com",   "city": "cairo" }
]
```

Used in Q14 (read), Q15 (read + push + write), and Q10 (delete).

---

## 🎯 Concepts Covered

- ✅ `path.dirname`, `basename`, `extname`, `parse`, `format`, `join`, `resolve`, `isAbsolute`
- ✅ `fs.readFileSync`, `fs.writeFile`, `fs.rm`, `fs.mkdirSync`
- ✅ `EventEmitter` — `.on()` and `.emit()` pattern
- ✅ `os.platform()` and `os.arch()`
- ✅ Sync vs Async file operations
- ✅ JSON read → parse → mutate → stringify → write cycle
