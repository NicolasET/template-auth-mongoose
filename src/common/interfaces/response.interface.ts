export interface Response<T = undefined> {
  data?: T;
  message: string;
  statusCode: 200 | 201;
}
