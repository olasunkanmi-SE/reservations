import { IGenericDocument } from "@app/shared-kernel/infrastructure/database/generic-document.interface";
import { UserDocument } from "../schema/user.schema";
import { User } from "../user";
export interface IUserRepository extends IGenericDocument<User, UserDocument> {}
