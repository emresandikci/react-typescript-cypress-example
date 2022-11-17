export type Action<TPayload> = {
  type: string;
  payload?: TPayload | Array<TPayload> | object | unknown | null;
};

export type InitialState<TData> = {
  isLoading: boolean;
  error: string | object | null;
  data?: TData;
};

export interface IEntityBase {
  readonly id: string | number;
}
