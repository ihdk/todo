import React, { createContext, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import {
  AddNewButton,
  ContentWrapper,
  Header,
  HomeIconLink,
  Loader,
  NothingToShow,
  PageWrapper,
  Title,
} from "../../features/components";
import TodoDetailContent from "./TodoDetailContent";
import { useGetTodo } from "../../app/api";
import EditTodoItemForm from "../../features/EditTodoItemForm";
import { TodoItemType, TodoType } from "../../app/types";
import { useDocumentTitle } from "../../app/helpers";

export type TodoContextType = {
  todo: TodoType;
  editedItem: TodoItemType | null;
  toggleEditing: () => void;
  setEditedItem: React.Dispatch<React.SetStateAction<TodoItemType | null>>;
};

export const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType
);

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<TodoItemType | null>(null);

  const { isSuccess, isLoading, isError, data: todo } = useGetTodo(id);

  useDocumentTitle(todo?.title);

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
    // disable currently edited data if disabling edit form
    if (editing) setEditedItem(null);
  }, [editing]);

  return (
    <PageWrapper>
      {isLoading && <Loader />}
      {isError && <NothingToShow text="Failed to load." />}
      {isSuccess && (
        <TodoContext.Provider
          value={{
            todo,
            toggleEditing,
            setEditedItem,
            editedItem,
          }}
        >
          <Header>
            <Title prefix="Todo" text={todo?.title} colored />
            <div className="flex items-center gap-2">
              <HomeIconLink />
              <AddNewButton
                text="New item"
                action={toggleEditing}
                visible={!editing}
              />
            </div>
          </Header>
          <ContentWrapper>
            {editing ? <EditTodoItemForm /> : <TodoDetailContent />}
          </ContentWrapper>
        </TodoContext.Provider>
      )}
    </PageWrapper>
  );
};

export default React.memo(TodoDetail);
