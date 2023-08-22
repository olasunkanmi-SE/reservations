import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TYPES } from "apps/book/src/constants/contstants";
import { UserRepository } from "./schema/user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDataModel, UserSchema } from "./schema/user.schema";
import { UserMapper } from "./user.mapper";
import { AuditMapper } from "@app/shared-kernel/application/audit";
import { DatabaseModule } from "@app/shared-kernel";

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: UserDataModel.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, { provide: TYPES.IUserRepository, useClass: UserRepository }, UserMapper, AuditMapper],
})
export class UsersModule {}
