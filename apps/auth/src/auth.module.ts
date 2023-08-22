import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "./users/users.module";
import { TYPES } from "apps/book/src/constants/contstants";
import { UserRepository } from "./users/schema/user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDataModel, UserSchema } from "./users/schema/user.schema";
import { UserMapper } from "./users/user.mapper";
import { AuditMapper } from "@app/shared-kernel/application/audit";

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: UserDataModel.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, { provide: TYPES.IUserRepository, useClass: UserRepository }, UserMapper, AuditMapper],
})
export class AuthModule {}
