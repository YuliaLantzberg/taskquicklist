import { useReducer, useState } from "react";
const initialTasks = [
  { id: 1, title: "Learn hooks", done: false },
  { id: 2, title: "Drink coffee", done: true },
];
function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), title: action.payload, done: false }];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
export default function HooksPractice() {
  const [text, setText] = useState("");
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Hook Practice
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New Task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span
                  className={
                    task.done ? "line-through text-gray-400" : "text-gray-800"
                  }
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      dispatch({ type: "TOGGLE_TASK", payload: task.id })
                    }
                    className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TASK", payload: task.id })
                    }
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
