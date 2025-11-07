import { useState, useEffect } from "react";

const initialTasks = [
  { id: 1, title: "Review JS", done: false },
  { id: 2, title: "Set up React", done: true },
];

export default function TaskQuicklist() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : initialTasks;
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const value = text.trim();
    if (!value) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: value, done: false },
    ]);
    setText("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  const doneCount = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });
  return (
    <div>
      <h2>Today’s Reactivation Tasks</h2>
      <p>
        Done: {doneCount}/{total}
      </p>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div>
        <button
          onClick={() => setFilter("all")}
          style={filter === "all" ? { fontWeight: "bold" } : {}}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={filter === "active" ? { fontWeight: "bold" } : {}}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("done")}
          style={filter === "done" ? { fontWeight: "bold" } : {}}
        >
          Done
        </button>
      </div>

      <ul>
        {visibleTasks.map((t) => (
          <li key={t.id}>
            <label>
              <button onClick={() => removeTask(t.id)}> Delete </button>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />

              {t.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
