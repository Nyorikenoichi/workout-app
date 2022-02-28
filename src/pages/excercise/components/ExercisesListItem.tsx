import * as React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import Exercise from '../../../core/interfaces/exercise';
import { ExerciseListIcon } from './styled/exerciseListIcon';

interface ExercisesListItemProps {
  item: Exercise;
}

export function ExercisesListItem({ item }: ExercisesListItemProps) {
  return (
    <ListItem disableGutters>
      <ExerciseListIcon src={item.photo} alt="" />
      <ListItemText
        primary={item.title}
        primaryTypographyProps={{ fontWeight: 600 }}
        secondary={`${item.duration} sec`}
        secondaryTypographyProps={{ color: 'black' }}
      />
    </ListItem>
  );
}
