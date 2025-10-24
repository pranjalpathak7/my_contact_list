import React from 'react';

// 'onSearch' is a function passed from App.jsx
const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        // When the user types, call the function from the parent
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;