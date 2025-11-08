import { useReducer, useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

const initialTasks = [
  { id: 1, title: "Learn hooks", done: false },
  { id: 2, title: "Drink coffee", done: true },
];

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      if (!action.payload.trim()) return state;
      return [
        ...state,
        { id: Date.now(), title: action.payload.trim(), done: false },
      ];
    case "TOGGLE_TASK":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export default function HooksPractice() {
  // 👇 THIS is the important line
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const outerClass =
    theme === "light"
      ? "min-h-screen w-screen flex items-center justify-center bg-gray-100"
      : "min-h-screen w-screen flex items-center justify-center bg-slate-900";

  const cardClass =
    theme === "light"
      ? "w-[95vw] max-w-xl bg-white rounded-2xl shadow-md p-6"
      : "w-[95vw] max-w-xl bg-slate-800 rounded-2xl shadow-md p-6";

  const titleClass =
    theme === "light"
      ? "text-2xl font-bold text-gray-800"
      : "text-2xl font-bold text-white";

  return (
    <div className={outerClass}>
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={titleClass}>Hook Practice</h2>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        <div className="flex gap-2 mb-4 items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New task..."
            className="flex-1 h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              dispatch({ type: "ADD_TASK", payload: text });
              setText("");
            }}
            className="h-10 leading-none bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-50"
            >
              <span
                className={
                  t.done ? "line-through text-gray-400" : "text-gray-800"
                }
              >
                {t.title}
              </span>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TASK", payload: t.id })
                  }
                  className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded"
                >
                  Toggle
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_TASK", payload: t.id })
                  }
                  className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
