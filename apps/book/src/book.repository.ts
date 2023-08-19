import { GenericDocumentRepository } from "@app/shared-kernel/infrastructure/database/generic-document.repository";
import { Injectable } from "@nestjs/common";
import { IBookRepoitory } from "./dto/book-repository.interface";
import { Book } from "./book";
import { BookDataModel, BookDocument } from "./schema/book.schema";
import { BookMapper } from "./book.mapper";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class BookRepository extends GenericDocumentRepository<Book, BookDocument> implements IBookRepoitory {
  _bookMapper: BookMapper;
  constructor(
    @InjectModel(BookDataModel.name) readonly bookDataModel: Model<BookDocument>,
    @InjectConnection() readonly connection: Connection,
    bookMapper: BookMapper
  ) {
    super(bookDataModel, connection, bookMapper);
    this._bookMapper = bookMapper;
  }
}
