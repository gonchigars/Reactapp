# React Tutorial for Beginners: From Project Creation to State Management

## Step 1: Setting Up Your Development Environment

Start by setting up your environment using Create React App, which configures everything for you.

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Open your terminal and run:

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

Your React app is now running locally!

## Step 2: Understanding the Basic Structure

Key files in your project:

- `src/index.js`: Entry point of your app.
- `src/App.js`: Main component.
- `public/index.html`: Where your React app is rendered.

In `src/App.js`, you'll find:

```jsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Edit <code>src/App.js</code> and save to reload.</p>
      </header>
    </div>
  );
}

export default App;
```

This functional component returns JSX, similar to HTML but with JavaScript.

## Step 3: Creating Your First Component

Create a new file `Greeting.js` in `src`:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
```

Use this component in `App.js`:

```jsx
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <Greeting name="World" />
    </div>
  );
}

export default App;
```

This displays "Hello, World!" in your browser.

## Step 4: React Hooks - `useState`

React Hooks let you use state in function components. Here's a simple example using `useState`:

```jsx
import React, { useState } from 'react';

function Greeting({ initialName }) {
  const [name, setName] = useState(initialName);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}

export default Greeting;
```

Use it in `App.js`:

```jsx
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <Greeting initialName="World" />
    </div>
  );
}

export default App;
```

## Step 5: Side Effects with `useEffect`

Use `useEffect` for side effects like logging or data fetching:

```jsx
import React, { useState, useEffect } from 'react';

function Greeting({ initialName }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    console.log('Name changed to:', name);
  }, [name]);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}

export default Greeting;
```

## Step 6: Introduction to Redux

Redux helps manage global state in complex apps.

1. Install Redux:

```bash
npm install redux react-redux
```

2. Create a reducer in `reducers.js`:

```javascript
const initialState = { name: 'World' };

function nameReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export default nameReducer;
```

3. Create actions in `actions.js`:

```javascript
export const setName = (name) => ({
  type: 'SET_NAME',
  payload: name
});
```

4. Create a store in `store.js`:

```javascript
import { createStore } from 'redux';
import nameReducer from './reducers';

const store = createStore(nameReducer);

export default store;
```

5. Use Redux in your app:

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Greeting from './Greeting';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Greeting />
      </div>
    </Provider>
  );
}

export default App;
```

6. Update `Greeting.js` to use Redux:

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName } from './actions';

function Greeting() {
  const name = useSelector(state => state.name);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => dispatch(setName(e.target.value))} 
      />
    </div>
  );
}

export default Greeting;
```

## Conclusion

This tutorial covers the basics of React, including:

- Setting up a React project
- Creating components
- Using React Hooks (`useState`, `useEffect`)
- Basic state management with Redux

Practice building your own components and experimenting with these concepts. Happy coding!
