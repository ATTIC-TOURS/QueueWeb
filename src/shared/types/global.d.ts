// TODO 1: Change error structure to match the API response
declare global {
  type RequestError = {
    error?: {
      message: string;
    };
  };
  type Nullable<T> = T | undefined | null;
}

export {};