import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { GlobalState } from '../store/reducers/globalStateReducer';
import { Collections } from '../constants/collections';
import { Statistics } from '../interfaces/statistics';

export async function getStatistics(state: GlobalState) {
  const docRef = doc(db, Collections.users, state.user?.uid as string);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Statistics;
}
