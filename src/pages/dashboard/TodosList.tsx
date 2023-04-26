import React from "react";

import { useGetTodos } from "../../app/api";
import Todo from "./Todo";
import { Loader, NothingToShow } from "../../features/components";

const TodosList: React.FC = () => {
  const { isSuccess, isLoading, isError, data: todos } = useGetTodos();

  return (
    <>
      {isLoading && <Loader />}
      {isError && <NothingToShow text="Failed to load." />}
      {isSuccess &&
        (todos.length > 0 ? (
          <ul className="menu menu-normal m-0 w-full p-0">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <NothingToShow />
        ))}
    </>
  );
};

export default React.memo(TodosList);
