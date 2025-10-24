import React from 'react';

// Grid Icon
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h6v6H4V4zm8 0h6v6h-6V4zm-8 8h6v6H4v-6zm8 8h6v6h-6v-6zm-8 0h6v6H4v-6zm8-8h6v6h-6v-6z" />
  </svg>
);

// List Icon
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
);

const ViewToggle = ({ viewStyle, toggleViewStyle }) => {
  return (
    <button className="view-toggle" onClick={toggleViewStyle} title="Change view">
      {viewStyle === 'grid' ? <ListIcon /> : <GridIcon />}
    </button>
  );
};

export default ViewToggle;