import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { DatabaseModule } from "@app/shared-kernel";
import { BookRepository } from "./book.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { BookDataModel, BookSchema } from "./schema/book.schema";
import { BookMapper } from "./book.mapper";
import { AuditMapper } from "@app/shared-kernel/application/audit";
import { TYPES } from "./constants/contstants";
import { AuthModule } from "apps/auth/src/auth.module";
import { UserRepository } from "apps/auth/src/users/schema/user.repository";
import { UserDataModel, UserSchema } from "apps/auth/src/users/schema/user.schema";
import { UserMapper } from "apps/auth/src/users/user.mapper";
import { APP_FILTER } from "@nestjs/core";
import { ApplicationExceptionsFilter } from "@app/shared-kernel/infrastructure/filters";
import { ApplicationLogger } from "@app/shared-kernel/infrastructure/logger";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: BookDataModel.name, schema: BookSchema },
      { name: UserDataModel.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionsFilter,
    },
    BookService,
    { provide: TYPES.IBookRepoitory, useClass: BookRepository },
    { provide: TYPES.IUserRepository, useClass: UserRepository },
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
    BookMapper,
    AuditMapper,
    UserMapper,
  ],
})
export class BookModule {}
