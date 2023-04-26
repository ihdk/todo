import React, { useContext, useState } from "react";
import type { TodoItemType } from "../app/types";
import { updateTodoItem, useGetTodo } from "../app/api";
import { TodoContext, TodoContextType } from "../pages/todo-detail";

const FinishedToggleButton: React.FC<{ item: TodoItemType }> = ({ item }) => {
  const { todo } = useContext<TodoContextType>(TodoContext);
  const { refetch } = useGetTodo(todo.id);
  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setLoading(!loading);
    updateTodoItem(
      "update",
      {
        todo,
        itemData: { ...item, finished: !item.finished },
      },
      () => {
        refetch();
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <button
      className={`btn-primary btn-square btn-xs btn ${
        !item.finished && "btn-outline"
      } ${loading && "loading"}`}
      onClick={handleChange}
    >
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="0"
            d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          />
        </svg>
      )}
    </button>
  );
};

export default React.memo(FinishedToggleButton);
