export interface RequestResult<T = null, E = Error> {
  payload?: T;
  error?: E;
}
