import React, { useContext, useState } from "react";
import { DeleteButton, EditButton } from "../../features/components";
import { updateTodoItem, useGetTodo } from "../../app/api";
import { TodoContext, TodoContextType } from ".";
import { ItemContext, ItemContextType } from "./Item";

const ItemContent: React.FC = () => {
  const [removing, setRemoving] = useState(false);
  const { todo, setEditedItem, toggleEditing } =
    useContext<TodoContextType>(TodoContext);
  const { item } = useContext<ItemContextType>(ItemContext);
  const { refetch } = useGetTodo(todo.id);

  const handleRemove = async () => {
    setRemoving(true);
    updateTodoItem(
      "delete",
      {
        todo,
        itemData: item,
      },
      () => refetch(),
      () => setRemoving(false)
    );
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-base font-bold m-0">{item.title}</h2>
        <p className="m-0 whitespace-pre-line">{item.description}</p>
      </div>
      <div className="flex items-center gap-3">
        <EditButton
          action={() => {
            setEditedItem(item);
            toggleEditing();
          }}
        />
        <DeleteButton action={handleRemove} loading={removing} />
      </div>
    </div>
  );
};

export default React.memo(ItemContent);
