import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainRoutes from '../../../core/constants/mainRoutes';
import ExerciseGroup from '../../../core/interfaces/exerciseGroup';

interface WorkoutCardProps {
  card: ExerciseGroup;
}

export default function WorkoutCard({ card }: WorkoutCardProps) {
  return (
    <Link to={MainRoutes.exercise} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          height="300"
          image={card.exercises[0].photo as string}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title as string}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.muscle_group.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
