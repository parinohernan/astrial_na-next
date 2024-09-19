import React from "react";

const SearchBar: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Buscar..."
      className="px-4 py-2 rounded-lg"
      disabled
    />
  );
};

export default SearchBar;
