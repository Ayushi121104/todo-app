import { useState } from "react";
import "./App.css";

const PRIORITIES = ["high", "medium", "low"];

const SAMPLE_TODOS = [
  { id: 1, text: "Set up DeployEase project repository", done: false, priority: "high" },
  { id: 2, text: "Design the dashboard layout", done: true, priority: "medium" },
  { id: 3, text: "Write project README", done: false, priority: "low" },
];

function Checkbox({ checked, onClick }) {
  return (
    <div className={`checkbox ${checked ? "checked" : ""}`} onClick={onClick}>
      {checked && (
        <svg viewBox="0 0 10 10" fill="none" width="11" height="11">
          <polyline
            points="1.5,5 4,7.5 8.5,2.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState(SAMPLE_TODOS);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  const add = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((t) => [...t, { id: Date.now(), text, done: false, priority }]);
    setInput("");
  };

  const toggle = (id) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const remove = (id) => setTodos((t) => t.filter((x) => x.id !== id));

  const filtered = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );

  const done = todos.filter((t) => t.done).length;
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0;

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <div>
            <h1 className="title">Task Board</h1>
            <p className="subtitle">DeployEase — project task manager</p>
          </div>
          <div className="badge">{todos.length} tasks</div>
        </div>

        <div className="stats">
          {[
            { label: "Total", value: todos.length },
            { label: "Done", value: done },
            { label: "Progress", value: `${pct}%` },
          ].map(({ label, value }) => (
            <div key={label} className="stat">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a new task..."
            className="task-input"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`priority-select p-${priority}`}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
          <button className="btn-add" onClick={add}>
            + Add
          </button>
        </div>

        <div className="tabs">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={`tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filtered.length === 0 ? (
            <div className="empty">No tasks here ✓</div>
          ) : (
            filtered.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
                <Checkbox checked={todo.done} onClick={() => toggle(todo.id)} />
                <span className="todo-text">{todo.text}</span>
                <span className={`priority-badge p-${todo.priority}`}>
                  {todo.priority}
                </span>
                <button className="btn-del" onClick={() => remove(todo.id)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <p className="footer">
          {todos.length - done} task{todos.length - done !== 1 ? "s" : ""} remaining
        </p>
      </div>
    </div>
  );
}
