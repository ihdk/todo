import React, { useCallback, useContext, useState } from "react";
import { DeleteButton } from "./components";
import { TodoContext } from "../pages/todo-detail";

const SearchBar: React.FC = () => {
  const { searchPhrase, getSearchPhrase } = useContext(TodoContext);
  const [text, setText] = useState(searchPhrase);

  const handleSubmit = () => {
    getSearchPhrase(text);
  };

  const handleCancel = useCallback(() => {
    setText("");
    getSearchPhrase("");
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 sm:justify-start">
      <div className="relative">
        {text && (
          <div className="absolute right-1 mt-1">
            <DeleteButton action={handleCancel} />
          </div>
        )}
        <input
          type="text"
          placeholder="Search items"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="input input-sm input-bordered input-primary "
        />
      </div>
      <button
        onClick={handleSubmit}
        className="btn btn-sm btn-outline btn-primary"
      >
        Search
      </button>
    </div>
  );
};

export default React.memo(SearchBar);
