import React from 'react';

// New, better Sun Icon
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px">
    <path d="M12 2.5c-.28 0-.5.22-.5.5v2a.5.5 0 001 0v-2c0-.28-.22-.5-.5-.5zM17.65 6.35a.5.5 0 00-.7.7l1.41 1.41a.5.5 0 00.7-.7l-1.41-1.41zM19 12c0-.28.22-.5.5-.5h2a.5.5 0 000-1h-2c-.28 0-.5.22-.5.5s.22.5.5.5zM12 18.5c-.28 0-.5.22-.5.5v2a.5.5 0 001 0v-2c0-.28-.22-.5-.5-.5zM6.35 17.65a.5.5 0 00.7.7l1.41-1.41a.5.5 0 00-.7-.7l-1.41 1.41zM2.5 12c0-.28.22-.5.5-.5h2a.5.5 0 000-1H3c-.28 0-.5.22-.5.5s.22.5.5.5zM6.35 6.35a.5.5 0 00.7-.7L7.05 4.24a.5.5 0 00-.7.7l1.41 1.41zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

// Moon Icon (unchanged)
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px">
    <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />
  </svg>
);

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <label className="theme-slider-label">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={isLight}
      />
      <span className="slider-track"></span>
      <span className="slider-thumb">
        {isLight ? <SunIcon /> : <MoonIcon />}
      </span>
    </label>
  );
};

export default ThemeToggle;