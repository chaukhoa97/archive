export default function App() {
  // When the color changes, <ExpensiveTree /> will be re-rendered
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}


// Cách 1: Vì <ExpensiveTree /> ko quan tâm đến `color` nên tách phần quan tâm đến `color` ra riêng 1 component - ở đây là <Form />
export default function App2() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}
function Form() {
  let [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p> 
    </>
  );
}

// Cách 2: Cách 1 ko dùng dc khi state phải dc viết ở component cha.
export default function App3() {
  return (
    <ColorPicker>
      <p>Hello, world!</p>
      <ExpensiveTree />
    </ColorPicker>
  );
}
function ColorPicker({ children }) {
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}