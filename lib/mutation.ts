import { User } from "@prisma/client";
import {fetcher} from "./fetcher";

export const Auth = (mode: 'signin'|'signup', email: string, password: string): Promise<User> => {
  return fetcher(mode, {email, password});
}