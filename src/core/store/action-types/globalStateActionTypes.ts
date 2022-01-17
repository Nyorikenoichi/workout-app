export interface GlobalStateAction {
  type: string;
}

export enum GlobalStateActionTypes {
  Increment = 'increment',
  Decrement = 'decrement',
}
