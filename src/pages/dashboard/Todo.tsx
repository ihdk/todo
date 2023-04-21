import React, { useCallback, useState } from "react";

import { Link } from "react-router-dom";
import { DeleteButton } from "../../features/components";
import type { TodoType } from "../../app/types";
import { deleteTodo, useGetTodos } from "../../app/api";

const Todo: React.FC<{ data: TodoType }> = ({ data }) => {
  const [removing, setRemoving] = useState(false);
  const { refetch } = useGetTodos();

  const handleRemove = useCallback(async () => {
    setRemoving(true);
    deleteTodo(
      data.id,
      () => refetch(),
      () => setRemoving(false)
    );
  }, [data.id, refetch]);

  return (
    <li className="m-0 p-0 ">
      <Link
        to={`/todo/${data.id}`}
        className="link-primary "
        style={{
          textDecoration: "none",
          ...(removing ? { pointerEvents: "none", opacity: 0.5 } : null),
        }}
      >
        <div className="flex items-center justify-between w-full">
          <h2 className="text-base m-0">{data.title}</h2>
          <div className="flex items-center">
            <div className="text-primary/70 mr-5">
              {`${data.items.length} ${
                data.items.length === 1 ? "item" : "items"
              }`}
            </div>

            <DeleteButton action={handleRemove} loading={removing} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(Todo);
