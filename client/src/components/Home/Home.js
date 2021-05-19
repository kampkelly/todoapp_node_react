import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import Todo from '../Todo/Todo';
import { TodoContext } from '../../state/Contexts/TodoContext';

const Home = () => {
  const { state, setState } = useContext(TodoContext);

  const { todos } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/todos');
      const res = await response.json();

      setState({ ...state, todos: res.data });

    }
    fetchData();
  }, []);

  const todoList = todos.map((todo) => <Todo key={todo.id} todo={todo}></Todo>);

  return (
      <div className="countdown">
        <section>
        <Container maxWidth="sm">
          <h1>My Todo App</h1>
          <h3> List of Todos</h3>
          {todoList}
        </Container>
        </section>
      </div>
  )
};

export default Home;
