import { BaseDocument } from "@app/shared-kernel/infrastructure/database/base-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IBook } from "../dto/book.interface";
import { Document } from "mongoose";

export type BookDocument = BookDataModel & Document;

@Schema({ versionKey: "false" })
export class BookDataModel extends BaseDocument implements Omit<IBook, "audit"> {
  @Prop({ type: String, required: true })
  startDate: string;

  @Prop({ type: String, required: false })
  endDate: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: false })
  locationId: string;

  @Prop({ type: String, required: false })
  invoiceId: string;
}

export const BookSchema = SchemaFactory.createForClass(BookDataModel);
