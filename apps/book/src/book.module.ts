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

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: BookDataModel.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, { provide: TYPES.IBookRepoitory, useClass: BookRepository }, BookMapper, AuditMapper],
})
export class BookModule {}
