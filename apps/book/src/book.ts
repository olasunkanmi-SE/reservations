import { Audit, Entity, Result } from "@app/shared-kernel/domain";
import { IBook } from "./dto/book.interface";
import { Types } from "mongoose";

export class Book extends Entity<IBook> implements IBook {
  _startDate: string;
  _endDate: string;
  _userId: string;
  _locationId: string;
  _invoiceId: string;
  _audit: Audit;
  constructor(id: Types.ObjectId, props: IBook) {
    super(id);
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._userId = props.userId;
    this._locationId = props.locationId;
    this._invoiceId = props.invoiceId;
    this._audit = props.audit;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(startDate: string) {
    this._startDate = startDate;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(endDate: string) {
    this._endDate = endDate;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  get invoiceId(): string {
    return this._invoiceId;
  }

  set invoiceId(invoiceId: string) {
    this._invoiceId = invoiceId;
  }

  get locationId(): string {
    return this._locationId;
  }

  set locationId(locationId: string) {
    this._locationId = locationId;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IBook, id?: Types.ObjectId): Result<Book> {
    return Result.ok(new Book(id, props));
  }
}
