# 📝 JavaScript Fundamentals — Practice Exercises

A JavaScript fundamentals assignment covering **15 exercises** on core JS concepts — type conversion, array methods, destructuring, closures, and more. Also includes a **LeetCode bonus problem** and a written study on key JavaScript concepts.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Language | JavaScript (ES6+) |
| Dependencies | None |

---

## 📁 Project Structure

```
Assignment1/
├── index.js     # 15 JS exercises (commented out individually)
├── bonus.js     # LeetCode bonus — Counter closure problem
├── essay.txt    # Study notes on JS concepts
└── README.md
```

---

## 🛠️ How to Run

```bash
# No installation needed — pure Node.js
# Uncomment the exercise you want to run, then:
node index.js

# To run the bonus:
node bonus.js
```

---

## 📋 Exercises Overview (`index.js`)

| # | Function | Concept | Description |
|---|---|---|---|
| Q1 | `stringToNumberConverter()` | Type Conversion | Convert string `"123"` to number and add 7 |
| Q2 | `falsyCheck(number)` | Falsy Values | Return `"invalid"` if value is falsy |
| Q3 | `print_odd()` | Loops + `continue` | Print odd numbers from 0 to 9 |
| Q4 | `getEven(arr)` | `filter` + callbacks | Return only even numbers from an array |
| Q5 | `spreed2Arrays()` | Spread Operator | Merge two arrays using `...spread` |
| Q6 | `getWeekDays(day)` | `switch` statement | Return day name from a number (1–7) |
| Q7 | `getStringsLength(arr)` | Loops + arrays | Return array of string lengths |
| Q8 | `DivisableChecker(num)` | Nested functions + conditions | Check divisibility by 3, 5, both, or neither |
| Q9 | `squareOfNumber(num)` | Type checking | Return square of number with edge cases (0, 1, invalid) |
| Q10 | `DestructionFunction(obj)` | Destructuring | Destructure `{ name, age }` from object and return formatted string |
| Q11 | `getSum()` | `arguments` object | Sum all passed arguments using `arguments` object |
| Q13 | `findMaxElement(arr)` | Loops | Find max element in an array manually |
| Q14 | `getObjectKeys(obj)` | `Object.keys` | Return all keys of an object |
| Q15 | `splitString(str)` | String methods | Split a sentence string into an array of words |

> Q12 is intentionally left blank in the assignment.

---

## 🏆 Bonus — LeetCode Problem (`bonus.js`)

**Problem:** [2665. Counter II](https://leetcode.com/problems/counter-ii/)

Implement a `createCounter(init)` function that returns an object with three methods:

| Method | Description |
|---|---|
| `increment()` | Increment the counter and return the new value |
| `decrement()` | Decrement the counter and return the new value |
| `reset()` | Reset to the original `init` value and return it |

**Solution approach:** Closure — `originalValue` stores the initial value separately from the mutable `init`.

```js
const counter = createCounter(5);
counter.increment(); // 6
counter.reset();     // 5
counter.decrement(); // 4
```

---

## 📖 JavaScript Concepts — Study Notes (`essay.txt`)

### `==` vs `===`
| Operator | Behavior |
|---|---|
| `==` | Checks **value only** (loose equality) |
| `===` | Checks **value AND type** (strict equality) |

### `try-catch`
- A structured way to handle exceptions (errors)
- Wraps risky code in `try` — if it throws, `catch` handles the error
- Especially important in **async operations** — e.g. returning `404` when a server request fails instead of crashing

### Type Conversion vs Type Coercion

| Concept | Description | Example |
|---|---|---|
| **Type Conversion** | Explicit — developer manually converts types | `Number("123")` → `123` |
| **Type Coercion** | Implicit — JS converts automatically | `8 + "2"` → `"82"` (string) |
| | | `"8" - 2` → `6` (number) |

> String + Number → String (concatenation)  
> String - Number → Number (arithmetic)

---

## 🎯 Concepts Covered

- ✅ Type conversion & coercion
- ✅ Falsy values
- ✅ Loops — `for`, `continue`
- ✅ Array methods — `filter`
- ✅ Spread operator
- ✅ `switch` statements
- ✅ Nested functions
- ✅ Type checking with `typeof`
- ✅ Object destructuring
- ✅ `arguments` object
- ✅ `Object.keys()`
- ✅ String `.split()`
- ✅ Closures (bonus)
- ✅ `==` vs `===`, `try-catch`, type coercion (essay)