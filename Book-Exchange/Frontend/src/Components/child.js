import React, { useContext } from 'react';
import AppContext from './AppContext';

const Child = () => {
  const { state, setState } = useContext(AppContext);

  return (
    <div>
      <p>Current Context Value: {state}</p>
      <button onClick={() => setState("Context Updated!")}>
        Update Context
      </button>
    </div>
  );
};

export default Child;
