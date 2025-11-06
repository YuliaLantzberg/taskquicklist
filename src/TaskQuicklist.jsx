import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Review JS", done: false },
  { id: 2, title: "Set up React", done: true },
];

export default function TaskQuicklist() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");

  function addTask() {
    const value = text.trim();
    if (!value) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), title: value, done: false },
    ]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const doneCount = tasks.filter(t => t.done).length;
  const total = tasks.length;

  return (
    <div>
      <h2>Today’s Reactivation Tasks</h2>
      <p>
        Done: {doneCount}/{total}
      </p>

      <div>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <label>
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
