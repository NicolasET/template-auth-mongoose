export interface ResponseCount<T> {
  data: {
    count: number;
    rows: T[];
  };
  message: string;
  statusCode: 200 | 201;
}
