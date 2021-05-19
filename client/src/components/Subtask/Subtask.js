import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const Subtask = (props) => {
  const status = props.subtask?.status || props.subtask.attributes?.status;
  return (
    <li className="subtask">
        <ListItem key={1} button>
          <ListItemText primary={props.subtask?.title || props.subtask.attributes?.title}/>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={status === 'completed' ? true: false}
              />
            </ListItemSecondaryAction>
          </ListItem>
    </li>
  );
};

export default Subtask;
