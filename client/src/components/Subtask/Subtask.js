import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const Subtask = (props) => {
  return (
    <li className="subtask">
        <ListItem key={1} button>
          <ListItemText primary="cool oness"/>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={props.subtask.status === 'completed' ? true: false}
              />
            </ListItemSecondaryAction>
          </ListItem>
    </li>
  );
};

export default Subtask;
