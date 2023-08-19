import { IMapper } from "@app/shared-kernel/domain";
import { BookDataModel } from "./schema/book.schema";
import { Injectable } from "@nestjs/common";
import { Book } from "./book";
import { AuditMapper } from "@app/shared-kernel/application/audit";

@Injectable()
export class BookMapper implements IMapper<Book, BookDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toDomain(model: BookDataModel): Book {
    const { _id, startDate, endDate, invoiceId, locationId, userId } = model;
    const book: Book = Book.create(
      {
        startDate,
        endDate,
        invoiceId,
        locationId,
        userId,
        audit: this.auditMapper.toDomain(model),
      },
      _id
    ).getValue();
    return book;
  }

  toPersistence(entity: Book): BookDataModel {
    const { startDate, endDate, invoiceId, locationId, userId, audit } = entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;

    const BookDocument: BookDataModel = {
      _id: entity.id,
      startDate,
      endDate,
      invoiceId,
      locationId,
      userId,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
    return BookDocument;
  }
}
