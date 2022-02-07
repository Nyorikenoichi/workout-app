import Exercise from './exercise';

interface ExerciseGroup {
  exercises: Exercise[];
  muscle_group: {
    name: string;
    photo: string;
  };
  title: string;
}

export default ExerciseGroup;
