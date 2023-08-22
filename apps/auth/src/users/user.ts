import { Audit, Entity, Result } from "@app/shared-kernel/domain";
import { IUser } from "./dto/user.interface";
import { Types } from "mongoose";

export class User extends Entity<IUser> implements IUser {
  _email: string;
  _password: string;
  _audit: Audit;
  constructor(id: Types.ObjectId, props: IUser) {
    super(id);
    this._email = props.email;
    this._password = props.password;
  }
  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IUser, id?: Types.ObjectId): Result<User> {
    return Result.ok(new User(id, props));
  }
}
