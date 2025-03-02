import { useRef, useState } from "react";
import './App.css';

type TodoItem = {
  type: string;
  name: string;
};

const initialTodos: TodoItem[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [fruits, setFruits] = useState<TodoItem[]>([]);
  const [vegetables, setVegetables] = useState<TodoItem[]>([]);

  const timeoutMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const moveItem = (item: TodoItem, column: string) => {
    if (column === "Fruit") {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }
    setTodos((prev) => prev.filter((todo) => todo.name !== item.name));

    const timeoutId = setTimeout(() => {
      timeoutMap.current.delete(item.name);

      if (column === "Fruit") {
        setFruits((prev) => prev.filter((todo) => todo.name !== item.name));
      } else {
        setVegetables((prev) => prev.filter((todo) => todo.name !== item.name));
      }
      setTodos((prev) => [...prev, item]);
    }, 5000);

    timeoutMap.current.set(item.name, timeoutId);
  };

  const moveBack = (item: TodoItem, column: string) => {
    if (timeoutMap.current.has(item.name)) {
      clearTimeout(timeoutMap.current.get(item.name)!);
      timeoutMap.current.delete(item.name);
    }

    if (column === "Fruit") {
      setFruits((prev) => prev.filter((todo) => todo.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((todo) => todo.name !== item.name));
    }
    setTodos((prev) => [...prev, item]);
  };

  return (
    <div className="container">
      <div className="column">
        <h3>Todo List</h3>
        {todos.map((item) => (
          <button key={item.name} onClick={() => moveItem(item, item.type)} className="todo-button">
            {item.name}
          </button>
        ))}
      </div>
      <div className="column">
        <h3>Fruits</h3>
        {fruits.map((item) => (
          <button key={item.name} onClick={() => moveBack(item, "Fruit")} className="todo-button fruit">
            {item.name}
          </button>
        ))}
      </div>
      <div className="column">
        <h3>Vegetables</h3>
        {vegetables.map((item) => (
          <button key={item.name} onClick={() => moveBack(item, "Vegetable")} className="todo-button vegetable">
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
