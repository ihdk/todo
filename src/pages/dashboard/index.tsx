import React, { createContext, useCallback, useState } from "react";
import { useDocumentTitle } from "../../app/helpers";
import EditTodoForm from "../../features/EditTodoForm";
import TodosList from "./TodosList";
import {
  AddNewButton,
  ContentWrapper,
  Header,
  PageWrapper,
  Title,
} from "../../features/components";
import { TodoType } from "../../app/types";

export type DashboardContextType = {
  toggleEditing: () => void;
  editedTodo: TodoType | null;
  setEditedTodo: React.Dispatch<React.SetStateAction<TodoType | null>>;
};

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

const Dashboard: React.FC = () => {
  useDocumentTitle();
  const [editing, setEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoType | null>(null);

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
    // disable currently edited data if disabling edit form
    if (editing) setEditedTodo(null);
  }, [editing]);

  return (
    <PageWrapper>
      <Header>
        <Title text="All todos" />
        <AddNewButton
          text="New Todo"
          action={toggleEditing}
          visible={!editing}
        />
      </Header>
      <ContentWrapper>
        <DashboardContext.Provider
          value={{ toggleEditing, editedTodo, setEditedTodo }}
        >
          {editing ? <EditTodoForm /> : <TodosList />}
        </DashboardContext.Provider>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Dashboard;
