import React, { useCallback, useState } from "react";
import { useDocumentTitle } from "../../app/helpers";
import AddNewTodo from "../../features/AddNewTodo";
import TodosList from "./TodosList";
import {
  AddNewButton,
  ContentWrapper,
  Header,
  PageWrapper,
  Title,
} from "../../features/components";

const Dashboard: React.FC = () => {
  useDocumentTitle();
  const [addingNew, setAddingNew] = useState(false);

  const toggleAdding = useCallback(() => {
    setAddingNew(!addingNew);
  }, [addingNew]);

  return (
    <PageWrapper>
      <Header>
        <Title text="All todos" />
        <AddNewButton
          text="New Todo"
          action={toggleAdding}
          visible={!addingNew}
        />
      </Header>
      <ContentWrapper>
        {addingNew ? <AddNewTodo toggleAdding={toggleAdding} /> : <TodosList />}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Dashboard;
