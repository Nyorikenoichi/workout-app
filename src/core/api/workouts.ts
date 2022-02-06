import { Urls } from '../constants/urls';

export async function getWorkouts() {
  const response = await fetch(Urls.WorkoutApi);
  const dataJson = await response.json();
  return dataJson.data;
}
