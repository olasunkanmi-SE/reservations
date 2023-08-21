import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  startDate: string;
  @IsString()
  endDate: string;
  @IsString()
  userId: string;
  @IsString()
  @IsNotEmpty()
  locationId: string;
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
