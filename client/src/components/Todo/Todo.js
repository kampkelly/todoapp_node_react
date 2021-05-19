import React, { useState, useContext, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Input } from '@material-ui/core';

import List from '@material-ui/core/List';
import { TodoContext } from '../../state/Contexts/TodoContext';
import Subtask from '../Subtask/Subtask';
import './Todo.css';

const Todo = (props) => {
  const { state, setState } = useContext(TodoContext);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [addSubtaskError, setAddSubtaskError] = useState('');


  const handleInputChange = (e) => {
    setAddSubtaskError('');
    setSubtaskTitle(e.target.value)
  };

  useEffect(() => {
    setSubtasks(props.todo.attributes.subtasks);
  }, [state]);


  const addSubtask = async () => {
    if (!subtaskTitle.length) {
      setAddSubtaskError("The todo title is required");
      return;
    }
    try {
      const response = await fetch(`/todos/${props.todo.id}/subtasks`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/vnd.api+json",
        },
        method: "POST",
        body: JSON.stringify({
          data: {
            type: "subtask",
            attributes: {
              title: subtaskTitle,
            },
          },
        }),
      });
      const res = await response.json();
      const { data } = res;
      if (!response.ok) {
        throw Error(res.errors[0].title);
      }

      setSubtasks([...subtasks, data]);
    } catch (err) {
      setAddSubtaskError(err.message);
    }
  };

  const subtaskList = subtasks.map((subtask) => <Subtask key={subtask.id} todoID={props.todo.id} subtask={subtask}></Subtask>)
  const completedSubtasks = subtasks.filter((subtask) => subtask.status === 'completed' || subtask.attributes?.status === 'completed');
  return (
    <div className="todo">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox checked={props.todo.attributes.status === 'completed' ? true: false} />}
            label={`${props.todo.attributes.title}`}
          />
          <p className="counter">{completedSubtasks.length} of {subtasks.length} completed</p>
        </AccordionSummary>
        <AccordionDetails>
          <List>
          {subtaskList}
          </List>
        </AccordionDetails>
        <p color="secondary">{addSubtaskError}</p>
        <Input id="standard-basic" placeholder="Subtask title" onChange={handleInputChange} label="Standard" />
          <Button variant="contained" size="small" color="secondary" onClick={addSubtask}>
            Add Subtask
          </Button>
      </Accordion>
    </div>
  );
};

export default Todo;
