
# auto-ts 🔄

[![npm version](https://img.shields.io/npm/v/auto-ts)](https://www.npmjs.com/package/auto-ts)
[![License](https://img.shields.io/npm/l/auto-ts)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/auto-ts)](https://www.npmjs.com/package/auto-ts)

**Automatically generate TypeScript interfaces from JSON data, API responses, or database schemas.** Perfect for Mongoose, Sequelize, and raw data. Simplify your workflow and ensure type safety with just one function call!

---

## Features ✨
- **Instant Type Generation**: Convert JSON/API responses to TypeScript interfaces in one call.
- **ORM Support**: Works seamlessly with **Mongoose** and **Sequelize**.
- **Universal**: Runs in **Node.js** (writes files) and **browsers** (triggers downloads).
- **Zero Config**: Simple API with smart defaults.
- **Nested Objects**: Handles complex data structures effortlessly.

---

## Installation 💻

```bash
npm install auto-ts
# or
yarn add auto-ts
```

## Usage 🚀

### 1. In React ⚛️

```typescript
import { createTypedFetch } from 'auto-ts';

const fetchTodo = async () => {
  const res = await fetch('https://api.example.com/todos/1');
  const todo = await res.json();

  await createTypedFetch({
    interfaceName: "Todo",
    data: todo,
    outputPath: "TodoType.ts",
  });
};
```

### 2. Basic Example (Node.js)

```typescript
import { createTypedFetch } from 'auto-ts';

const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  roles: ["admin", "user"],
};

createTypedFetch({
  interfaceName: "User",
  data: user,
  outputPath: "./types/user-types.ts",
});
```

### Generated File (user-types.ts):

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export { User };
```

### 3. With Mongoose 🍃

```typescript
import { createTypedFetch } from 'auto-ts';
import UserModel from './models/User';

const user = await UserModel.findOne({ email: "test@example.com" });

createTypedFetch({
  interfaceName: "User",
  data: user,
  outputPath: "./types/mongoose-user.ts",
});
```

### Output:

```typescript
interface User {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export { User };
```

### 4. With Sequelize 🗄️

```typescript
import { createTypedFetch } from 'auto-ts';
import Product from './models/Product';

const product = await Product.findByPk(123);

createTypedFetch({
  interfaceName: "Product",
  data: product,
  outputPath: "./types/sequelize-product.ts",
});
```

### Output:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export { Product };
```

### Browser Behavior: Triggers a download of `TodoType.ts` with:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export { Todo };
```

### 5. With Raw SQL Data 🐬

```typescript
import { createTypedFetch } from 'auto-ts';
import { executeQuery } from './database';

const results = await executeQuery('SELECT * FROM orders WHERE user_id = 456');

createTypedFetch({
  interfaceName: "Order",
  data: results[0],
  outputPath: "./types/sql-order.ts",
});
```

### Output:

```typescript
interface Order {
  id: number;
  user_id: number;
  total: number;
  created_at: Date;
}

export { Order };
```

## API 📚

### `createTypedFetch(options)`
Generates and saves TypeScript interfaces.

#### Options

| Parameter      | Type   | Required | Description |
|---------------|--------|----------|-------------|
| `interfaceName` | `string` | Yes      | Name for the root interface (e.g., "User") |
| `data`         | `any`   | Yes      | Data object to analyze |
| `outputPath`   | `string` | Yes      | File path to save interfaces (e.g., "./types/user.ts") |

## FAQ ❓

**Q: How do I handle circular references?**
A: The library automatically detects and handles circular references by using `any` for the offending fields.

**Q: Can I customize date handling?**
A: Dates are always typed as `Date`. For custom formatting, transform your data first.

**Q: Does it work with Next.js/Nuxt.js?**
A: Yes! Works in any Node.js or browser environment.

## Contributing 🤝

Found a bug? Want a feature?

1. Fork the repo → `git clone your-fork-url`
2. Create a branch → `git checkout -b cool-feature`
3. Commit changes → `git commit -m "Add cool feature"`
4. Push → `git push origin cool-feature`
5. Open a PR!

[GitHub Repository](#)

## License 📜
MIT © Your Name

⭐ Star this repo if you love type-safe coding! 🚀


