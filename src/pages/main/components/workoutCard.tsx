import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MainRoutes } from '../../../core/constants/mainRoutes';
import ExerciseGroup from '../../../core/interfaces/exerciseGroup';
import { setCurrentExerciseGroupAction } from '../../../core/store/actions/globalStateActions';
import { ContextApp } from '../../../core/store/reducers/globalStateReducer';

interface WorkoutCardProps {
  card: ExerciseGroup;
}

export default function WorkoutCard({ card }: WorkoutCardProps) {
  const { dispatch } = useContext(ContextApp);

  const setCurrentExercises = () => {
    dispatch(setCurrentExerciseGroupAction({ currentExerciseGroup: card }));
  };

  return (
    <Link to={MainRoutes.exerciseGroup} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 300, margin: '25px' }} onClick={setCurrentExercises}>
        <CardMedia
          component="img"
          height="300"
          image={card.exercises[0].photo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.muscle_group.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
