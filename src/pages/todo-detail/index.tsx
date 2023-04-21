import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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
import { useGetTodo } from "../../app/api";
import Item from "./Item";
import { StateFilterType, TodoItemType, TodoType } from "../../app/types";
import AddNewTodoItem from "../../features/AddNewTodoItem";
import { getFilteredItems, useDocumentTitle } from "../../app/helpers";
import SearchBar from "../../features/SearchBar";
import StateFilter from "../../features/StateFilter";

export type TodoContextType = {
  todo: TodoType;
  filteredItems: TodoItemType[] | null;
  stateFilter: StateFilterType;
  updateFilter: (filter: StateFilterType) => void;
  getSearchPhrase: (phrase: string) => void;
};

export const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType
);

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [addingNew, setAddingNew] = useState(false);
  const [stateFilter, setStateFilter] = useState<StateFilterType>("all");
  const [searchPhrase, setSearchPhrase] = useState("");

  const { isSuccess, isLoading, isError, data: todo } = useGetTodo(id);

  useDocumentTitle(todo?.title);

  const toggleAdding = useCallback(() => {
    setAddingNew(!addingNew);
  }, [addingNew]);

  const updateFilter = useCallback((filter: StateFilterType) => {
    setStateFilter(filter);
  }, []);

  const getSearchPhrase = useCallback((phrase: string) => {
    setSearchPhrase(phrase.trim());
  }, []);

  const filteredItems = useMemo(
    () => getFilteredItems(todo, stateFilter, searchPhrase),
    [todo, stateFilter, searchPhrase]
  );

  return (
    <PageWrapper>
      {isLoading && <Loader />}
      {isError && <NothingToShow text="Failed to load." />}
      {isSuccess && (
        <TodoContext.Provider
          value={{
            todo,
            filteredItems,
            stateFilter,
            updateFilter,
            getSearchPhrase,
          }}
        >
          <Header>
            <Title prefix="Todo" text={todo?.title} colored />
            <div className="flex items-center gap-2">
              <HomeIconLink />
              <AddNewButton
                text="New item"
                action={toggleAdding}
                visible={!addingNew}
              />
            </div>
          </Header>
          <ContentWrapper>
            {addingNew ? (
              <AddNewTodoItem toggleAdding={toggleAdding} />
            ) : (
              <TodoContent />
            )}
          </ContentWrapper>
        </TodoContext.Provider>
      )}
    </PageWrapper>
  );
};

const TodoContent: React.FC = () => {
  const { todo, filteredItems } = useContext(TodoContext);
  const totalItemsCount = todo.items.length;
  const filteredItemsCount = filteredItems?.length;

  return totalItemsCount > 0 ? (
    <>
      <TodoItemsToolbar />
      {filteredItemsCount ? (
        filteredItems.map((item) => <Item key={item.id} item={item} />)
      ) : (
        <NothingToShow />
      )}
    </>
  ) : (
    <NothingToShow />
  );
};

const TodoItemsToolbar: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col justify-between px-4 pb-4 border-b-2 gap-4 sm:flex-row sm:gap-0">
      <SearchBar />
      <StateFilter />
    </div>
  );
});

export default React.memo(TodoDetail);
