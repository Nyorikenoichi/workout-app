import * as React from 'react';
import { Icon, ListItem, ListItemText } from '@mui/material';
import Exercise from '../../../core/interfaces/exercise';

interface ExercisesListItemProps {
  item: Exercise;
}

export function ExercisesListItem({ item }: ExercisesListItemProps) {
  return (
    <ListItem>
      <Icon>
        <img src={item.photo} height={25} width={25} alt="" />
      </Icon>
      <ListItemText primary={item.title} secondary={`${item.duration} sec`} />;
    </ListItem>
  );
}
