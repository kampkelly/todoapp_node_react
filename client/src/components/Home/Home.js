import React, { useContext, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Input } from '@material-ui/core';


import Todo from '../Todo/Todo';
import { TodoContext } from '../../state/Contexts/TodoContext';

const Home = () => {
  const { state, setState } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState('');
  const [addTodoError, setAddTodoError] = useState('');

  const { todos } = state;

  const handleInputChange = (e) => {
    setAddTodoError('');
    setTodoTitle(e.target.value)
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/todos');
      const res = await response.json();

      setState({ ...state, todos: res.data });

    }
    fetchData();
  }, []);

  const addTodo = async () => {
    if (!todoTitle.length) {
      setAddTodoError('The todo title is required');
      return;
    }
    try {
    const response = await fetch("/todos", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/vnd.api+json",
      },
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "todo",
          attributes: {
            title: todoTitle,
          },
        },
      }),
    });
    const res = await response.json();
    const { data } = res;
    if (!response.ok) {
      throw Error(res.errors[0].title);
    }
    
    setState({ ...state, todos: [ ...todos, data ] });
  } catch(err) {
    setAddTodoError(err.message);
  }

  };

  const todoList = todos.map((todo) => <Todo key={todo.id} todo={todo}></Todo>);

  return (
      <div className="countdown">
        <section>
        <Container maxWidth="sm">
          <h1>My Todo App</h1>
          <h3> List of Todos</h3>
          <p color="secondary">{addTodoError}</p>
          <Input id="standard-basic" placeholder="Todo title" onChange={handleInputChange} label="Standard" />
          <Button variant="contained" size="small" color="secondary" onClick={addTodo}>
            Add Todo
          </Button>
          {todoList}
        </Container>
        </section>
      </div>
  )
};

export default Home;
