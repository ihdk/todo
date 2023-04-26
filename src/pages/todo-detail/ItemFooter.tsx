import React, { useContext, useMemo } from "react";
import { DeadlineLabel } from "../../features/components";
import { dateIsAfterDeadline, getPrettyDate } from "../../app/helpers";
import FinishedToggleButton from "../../features/FinishedToggleButton";
import { ItemContext, ItemContextType } from "./Item";

const ItemFooter: React.FC = () => {
  const { item } = useContext<ItemContextType>(ItemContext);

  const isAfterDeadline = useMemo(
    () => dateIsAfterDeadline(item.date) && !item.finished,
    [item.finished, item.date]
  );
  const prettyDate = useMemo(() => getPrettyDate(item.date), [item.date]);

  return (
    <div className="mt-2 flex items-center justify-start gap-2">
      <FinishedToggleButton item={item} />
      <div className={`text-sm ${isAfterDeadline && "font-bold text-error"}`}>
        <DeadlineLabel text={prettyDate} afterDeadline={isAfterDeadline} />
      </div>
    </div>
  );
};

export default React.memo(ItemFooter);
