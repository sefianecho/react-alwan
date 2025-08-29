# react-alwan (v2)

`react-alwan` is a React component wrapper for the [Alwan](https://github.com/sefianecho/alwan) color picker library.  
It lets you seamlessly integrate Alwan into React applications with a fully React-friendly API.  

⚡ **Version 2** — a complete rewrite that now builds directly on the core Alwan library, instead of a React-only implementation.

## Installation

Install `react-alwan` via npm or yarn
```sh
# Using npm
npm install react-alwan

# Using yarn
yarn add react-alwan
```
## Usage

```typescript
import React from 'react';
import Alwan from 'react-alwan';
import 'react-alwan/style.css';

function App() {
  return <Alwan onChange={(color) => console.log(color)} />;
}

export default App;
```
> **Note:** For older Node versions that don’t fully support the "exports" field, you may need to import the CSS directly from the original package:
> ```typescript
> import 'alwan/dist/css/alwan.min.css';
> import Alwan from 'react-alwan';
> ```

## Props

- **`options`**: Same as the `options` in the [Alwan library](https://github.com/sefianecho/alwan?tab=readme-ov-file#options).
You can pass any configuration supported by Alwan through this prop.

Example:

```tsx
import Alwan from "react-alwan";
import "react-alwan/style.css"

export default function App() {
  return <Alwan options={{ theme: "dark", default: "#ff0000" }} />;
}
```
- **Events callbacks: `onChange`, `onColor`, `onOpen` and `onClose`**

`react-alwan` provides React-style props that map directly to the event handlers in the [Alwan](https://github.com/sefianecho/alwan) library.  
Each callback receives an **event object** as its argument, described [here](https://github.com/sefianecho/alwan#event-object-since-v13).

| Prop          | Alwan event   | Description                              |
|---------------|---------------|------------------------------------------|
| `onChange`    | `change`      | called when color changes                |
| `onColor`     | `color`       | called continuously as the color changes |
| `onOpen`      | `open`        | called when the color picker is opened   |
| `onClose`     | `close`       | called when the color picker is closed   |

### Example

```tsx
import Alwan from "react-alwan";
import "react-alwan/style.css"

export default function App() {
  return (
    <Alwan
      options={{ theme: "dark" }}
      onChange={(ev) => console.log("Color changed:", ev.rgb)}
      onOpen={(ev) => console.log("Picker opened")}
      onClose={(ev) => console.log("Picker closed")}
    />
  );
}
```

- **refEl**

The `refEl` prop is a **React element** used as the reference element for the color picker when the `preset` option is set to `false`.  
If `refEl` is not provided (or if `preset: true`), React-Alwan renders its own pre-styled button as the reference element.
