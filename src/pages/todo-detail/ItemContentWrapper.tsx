import React, { useContext } from "react";
import { ItemContext, ItemContextType } from "./Item";

const ItemContentWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { item } = useContext<ItemContextType>(ItemContext);
  return (
    <div
      className={`border-b-2 p-4 transition last:border-b-0 ${
        item.finished ? "bg-success/10" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default React.memo(ItemContentWrapper);
