import { BaseDocument } from "@app/shared-kernel/infrastructure/database/base-document";
import { IUser } from "../dto/user.interface";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = UserDataModel & Document;

export class UserDataModel extends BaseDocument implements Omit<IUser, "audit"> {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDataModel);
