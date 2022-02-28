import { Urls } from '../constants/urls';

export async function getWorkouts() {
  const response = await fetch(Urls.WorkoutApi);
  if (!response.ok) {
    throw new Error('Workouts server error');
  }
  const data = await response.json();
  return data.data;
}
