export type Action<TPayload> = {
  type: string;
  payload?: TPayload | TPayload[] | null;
};

export type InitialState<TData> = {
  isLoading: boolean;
  error: any;
  data?: TData;
};
export type IdentityKey = number | string | undefined;
export interface IEntityBase {
  id: IdentityKey;
}

export interface IHooksReturnState<TData, TParams> extends InitialState<TData> {
  reFetch: (params?: TParams) => {};
}
