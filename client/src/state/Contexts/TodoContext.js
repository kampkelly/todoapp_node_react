import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [state, setState] = useState({
    todos: [],
  });

  return  (
    <TodoContext.Provider value={{ state, setState }}>
      { props.children }
    </TodoContext.Provider>
  )
}

export default TodoContextProvider;
