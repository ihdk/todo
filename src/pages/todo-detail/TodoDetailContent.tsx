import React, { useContext, useMemo, useState } from "react";

import { TodoContext } from ".";
import { NothingToShow, SeachTitle } from "../../features/components";
import Item from "./Item";
import SearchBar from "../../features/SearchBar";
import StateFilter from "../../features/StateFilter";
import { StateFilterType } from "../../app/types";
import { getFilteredItems } from "../../app/helpers";

const TodoDetailContent: React.FC = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [stateFilter, setStateFilter] = useState<StateFilterType>("all");
  const { todo } = useContext(TodoContext);

  const filteredItems = useMemo(
    () => getFilteredItems(todo, stateFilter, searchPhrase),
    [todo, stateFilter, searchPhrase]
  );

  const totalItemsCount = todo.items.length;
  const filteredItemsCount = filteredItems?.length;

  return totalItemsCount > 0 ? (
    <>
      <div className="flex flex-col justify-between px-4 pb-4 border-b-2 gap-4 sm:flex-row sm:gap-0">
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        <StateFilter
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
        />
      </div>
      <SeachTitle searchPhrase={searchPhrase} />
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

export default React.memo(TodoDetailContent);
