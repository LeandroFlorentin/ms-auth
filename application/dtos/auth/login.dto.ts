export interface ILoginBody {
  username: string;
  password: string;
}

export type ReturnLoginEntity = { username: string } | { email: string };
