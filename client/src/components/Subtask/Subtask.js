import React, { useContext, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { TodoContext } from '../../state/Contexts/TodoContext';

const Subtask = (props) => {
  const { state, setState } = useContext(TodoContext);
  const [subtaskStatusError, setSubtaskStatusError] = useState('');

  const fetchData = async () => {
    const response = await fetch('/todos');
    const res = await response.json();

    setState({ ...state, todos: res.data });

  }

  const handleCheckboxChange = async (e, todoID, subtaskID) => {
    setSubtaskStatusError('');
    e.preventDefault();

    try {
    const response = await fetch(`/todos/${todoID}/subtasks/${subtaskID}`,{
      headers:{
          'Accept': 'application/json',
          "Content-Type": "application/vnd.api+json",
      },
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          type: "subtask",
          id: subtaskID,
          attributes: {
            status: e.target.checked ? 'completed': 'pending',
          },
        },
      }),
    });
    const res = await response.json();
    if (!response.ok) {
      throw Error(res.errors[0].title);
    }
    
    fetchData();
  } catch(err) {
    setSubtaskStatusError(err.message);
  }

  };

  const status = props.subtask?.status || props.subtask.attributes?.status;
  return (
    <li className="subtask">
      <span>{subtaskStatusError}</span>
        <ListItem key={1} button>
          <ListItemText primary={props.subtask?.title || props.subtask.attributes?.title}/>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={status === 'completed' ? true: false}
                onChange={(e) => handleCheckboxChange(e, props.todoID, props.subtask.id)}
              />
            </ListItemSecondaryAction>
          </ListItem>
    </li>
  );
};

export default Subtask;
