export interface RequestErrorMessage {
  code: string;
  detail: string;
  message?: string;
  title: string;
}
export declare type RequestErrorParams = Record<string, string>;
export interface RequestErrorAPI extends RequestErrorMessage {
  status: number;
  params?: RequestErrorParams;
}
export declare type RequestError = RequestErrorAPI | null | undefined;
