import React, { useContext } from "react";
import { ItemContext, ItemContextType } from "./Item";

const ItemContentWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { item } = useContext<ItemContextType>(ItemContext);
  return (
    <div
      className={`p-4 transition border-b-2 last:border-b-0 ${
        item.finished ? "bg-success/10" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default React.memo(ItemContentWrapper);
