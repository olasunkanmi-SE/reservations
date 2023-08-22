import { GenericDocumentRepository } from "@app/shared-kernel/infrastructure/database/generic-document.repository";
import { Injectable } from "@nestjs/common";
import { UserDataModel, UserDocument } from "./user.schema";
import { User } from "../user";
import { IUserRepository } from "../dto/user-repository.interface";
import { UserMapper } from "../user.mapper";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class UserRepository extends GenericDocumentRepository<User, UserDocument> implements IUserRepository {
  _userMapper: UserMapper;
  constructor(
    @InjectModel(UserDataModel.name) readonly userDataModel: Model<UserDocument>,
    @InjectConnection() readonly connection: Connection,
    userMapper: UserMapper
  ) {
    super(userDataModel, connection, userMapper);
    this._userMapper = userMapper;
  }
}
