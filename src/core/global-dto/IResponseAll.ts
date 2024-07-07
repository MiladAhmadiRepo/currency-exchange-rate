export declare class IResponseAll<TData> {
  count: number;
  status: number;
  message?: string;
  results: Array<TData>;
}