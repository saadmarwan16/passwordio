export interface IPasswordResponse {
  results: {
    password: string;
    id: number;
    contains: string[];
    length: number;
    value: string;
  };
}
