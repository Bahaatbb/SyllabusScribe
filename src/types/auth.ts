export interface ILoginTokenResponse {
  access: string;
  refresh: string;
}
export interface ILoginInData {
  username: string;
  password: string;
}

export interface IRegsiterData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}
