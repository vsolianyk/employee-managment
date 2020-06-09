export interface ResponseError {
  response: {
    data: {
      message: string;
      code: number;
    },
    status: number;
  };
}
