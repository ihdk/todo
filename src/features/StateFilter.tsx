import React, { useContext } from "react";
import { TodoContext } from "../pages/todo-detail";
import { StatesFiltersObjectType } from "../app/types";

const StateFilter: React.FC = () => {
  const { stateFilter, setStateFilter } = useContext(TodoContext);

  const states: StatesFiltersObjectType = {
    all: {
      activeFilter: stateFilter === "all",
      clickAction: () => setStateFilter("all"),
    },
    active: {
      activeFilter: stateFilter === "active",
      clickAction: () => setStateFilter("active"),
    },
    finished: {
      activeFilter: stateFilter === "finished",
      clickAction: () => setStateFilter("finished"),
    },
    missed: {
      activeFilter: stateFilter === "missed",
      clickAction: () => setStateFilter("missed"),
    },
  };

  return (
    <div className="flex justify-center sm:justify-end">
      <div className="btn-group btn-group-horizontal">
        {Object.keys(states).map((key) => {
          const data = states[key as keyof StatesFiltersObjectType];
          return (
            <button
              key={key}
              className={`btn btn-outline btn-primary btn-sm ${
                data.activeFilter && "btn-active"
              }`}
              onClick={data.clickAction}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(StateFilter);
