import { IGenericDocument } from "@app/shared-kernel/infrastructure/database/generic-document.interface";
import { BookDocument } from "../schema/book.schema";
import { Book } from "../book";

export interface IBookRepoitory extends IGenericDocument<Book, BookDocument> {}
