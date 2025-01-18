import React, { useState, useEffect, useRef } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Retrieve the visit count from local storage or default to 0
    const storedCount = parseInt(localStorage.getItem('visitCount'), 10) || 0;
    const newCount = storedCount + 1;

    // Update the state and local storage with the new visit count
    setCount(newCount);
    localStorage.setItem('visitCount', newCount);
  }, []);

  return (
    <div className="counter">
      <p>Visit Count: {count}</p>
    </div>
  );
};

export default Counter;
