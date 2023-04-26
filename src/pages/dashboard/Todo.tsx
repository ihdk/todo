import React, { useCallback, useContext, useState } from "react";

import { Link } from "react-router-dom";
import { DeleteButton, EditButton } from "../../features/components";
import type { TodoType } from "../../app/types";
import { deleteTodo, useGetTodos } from "../../app/api";
import { DashboardContext } from ".";

const Todo: React.FC<{ todo: TodoType }> = ({ todo }) => {
  const { setEditedTodo, toggleEditing } = useContext(DashboardContext);
  const [removing, setRemoving] = useState(false);
  const { refetch } = useGetTodos();

  const handleRemove = useCallback(() => {
    setRemoving(true);
    deleteTodo(
      todo.id,
      () => refetch(),
      () => setRemoving(false)
    );
  }, [todo.id, refetch]);

  return (
    <li className="m-0 p-0 ">
      <Link
        to={`/todo/${todo.id}`}
        className="link-primary"
        style={{
          textDecoration: "none",
          ...(removing ? { pointerEvents: "none", opacity: 0.5 } : null),
        }}
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="m-0 text-base">{todo.title}</h2>
          <div className="flex items-center gap-3">
            <div className="mr-5 text-primary/70">
              {`${todo.items.length} ${
                todo.items.length === 1 ? "item" : "items"
              }`}
            </div>
            <EditButton
              action={() => {
                setEditedTodo(todo);
                toggleEditing();
              }}
            />
            <DeleteButton action={handleRemove} loading={removing} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(Todo);
