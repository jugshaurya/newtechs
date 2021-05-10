import React, { useState } from 'react';
import styles from './colorButton.module.css';

/* Functionality
 * 1. Change button color
 * 2. disable button with a checkbox
 */

const ColorButton = () => {
  const [red, setRed] = useState(true);

  const colorChangehandler = () => {
    setRed((prevState) => !prevState);
  };

  return (
    <div className={styles['color-button']}>
      <button
        onClick={colorChangehandler}
        style={{
          background: `${red ? 'violet' : 'darkblue'}`,
        }}
      >
        Change to {red ? 'blue' : 'red'}
      </button>
    </div>
  );
};

export default ColorButton;
