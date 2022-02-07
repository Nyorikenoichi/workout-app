import * as React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import exerciseImage from '../../assets/images/exerciseImage.png';
import Exercise from '../../core/interfaces/exercise';

export default function Exercises() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const { currentExerciseGroup } = state;

  const renderExercisesList = () => {
    return currentExerciseGroup?.exercises.map((item: Exercise) => {
      return (
        <ListItem key={item.id}>
          <Icon>
            <img src={item.photo} height={25} width={25} alt="" />
          </Icon>
          <ListItemText
            primary={item.title}
            secondary={`${item.duration} sec`}
          />
          ;
        </ListItem>
      );
    });
  };

  return (
    <>
      <Typography>
        <Link to={MainRoutes.main}>{t('back_to_main')}</Link>
      </Typography>
      <img src={exerciseImage} alt="" />
      <Typography>{currentExerciseGroup?.title}</Typography>
      <List>{renderExercisesList()}</List>
      <Link to={MainRoutes.workout}>
        <Button variant="contained">Start Exercise</Button>
      </Link>
    </>
  );
}
