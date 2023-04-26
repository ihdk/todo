import React, { useCallback, useState } from "react";
import { DeleteButton } from "./components";

const SearchBar: React.FC<{
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchPhrase, setSearchPhrase }) => {
  const [text, setText] = useState(searchPhrase);

  const handleSubmit = () => {
    setSearchPhrase(text.trim());
  };

  const handleCancel = useCallback(() => {
    setText("");
    setSearchPhrase("");
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
          className="input-bordered input-primary input input-sm"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="btn-outline btn-primary btn-sm btn"
      >
        Search
      </button>
    </div>
  );
};

export default React.memo(SearchBar);
