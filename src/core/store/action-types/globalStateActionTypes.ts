export interface GlobalStateAction {
  type: string;
}

export enum GlobalStateActionTypes {
  inc = 'increment',
  dec = 'decrement',
}
