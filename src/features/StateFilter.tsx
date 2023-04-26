import React from "react";
import { StateFilterType, StatesFiltersObjectType } from "../app/types";

const StateFilter: React.FC<{
  stateFilter: StateFilterType;
  setStateFilter: React.Dispatch<React.SetStateAction<StateFilterType>>;
}> = ({ stateFilter, setStateFilter }) => {
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
              className={`btn-outline btn-primary btn-sm btn ${
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
