import React, { useState, useContext, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

import List from '@material-ui/core/List';


import { TodoContext } from '../../state/Contexts/TodoContext';

import Subtask from '../Subtask/Subtask';

const Todo = (props) => {
  const { state, setState } = useContext(TodoContext);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    setSubtasks(props.todo.attributes.subtasks);
  }, [state]);

  const subtaskList = subtasks.map((subtask) => <Subtask key={subtask.id} todoID={props.todo.id} subtask={subtask}></Subtask>)
  return (
    <div className="todo">
      <button>Add</button>
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
            label={props.todo.attributes.title}
          />
        </AccordionSummary>
        <AccordionDetails>
          <List>
          {subtaskList}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Todo;
