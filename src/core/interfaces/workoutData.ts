import ExerciseGroup from './exerciseGroup';

interface WorkoutData {
  name: string;
  questions: ExerciseGroup[];
  slug: string;
}

export default WorkoutData;
