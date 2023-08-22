import { Types } from "mongoose";
import { User } from "./user";

export type UserResponse = {
  id: Types.ObjectId;
  email: string;
};

export class UserParser {
  static createUserResponse({ email, password, id }: User): UserResponse {
    const response: UserResponse = { id, email };
    return response;
  }
}
