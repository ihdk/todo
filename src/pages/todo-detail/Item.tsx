import React, { createContext } from "react";
import type { TodoItemType } from "../../app/types";
import ItemContentWrapper from "./ItemContentWrapper";
import ItemContent from "./ItemContent";
import ItemFooter from "./ItemFooter";

export type ItemContextType = { item: TodoItemType };
export const ItemContext = createContext<ItemContextType>({
  item: {} as TodoItemType,
});

const Item: React.FC<{ item: TodoItemType }> = ({ item }) => {
  return (
    <ItemContext.Provider value={{ item }}>
      <ItemContentWrapper>
        <ItemContent />
        <ItemFooter />
      </ItemContentWrapper>
    </ItemContext.Provider>
  );
};

export default React.memo(Item);
