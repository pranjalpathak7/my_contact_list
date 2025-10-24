import React from 'react';

// Grid Icon
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
  </svg>
);

// List Icon
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const ViewToggle = ({ viewStyle, toggleViewStyle }) => {
  return (
    <div className="view-toggle">
      <button
        className={viewStyle === 'grid' ? 'active' : ''}
        onClick={() => {
          if (viewStyle !== 'grid') toggleViewStyle();
        }}
        title="Grid View"
      >
        <GridIcon />
      </button>
      <button
        className={viewStyle === 'list' ? 'active' : ''}
        onClick={() => {
          if (viewStyle !== 'list') toggleViewStyle();
        }}
        title="List View"
      >
        <ListIcon />
      </button>
    </div>
  );
};

export default ViewToggle;