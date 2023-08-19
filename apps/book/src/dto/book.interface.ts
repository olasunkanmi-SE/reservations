import { Audit } from "@app/shared-kernel/domain";

export interface IBook {
  startDate: string;
  endDate: string;
  userId: string;
  locationId: string;
  invoiceId: string;
  audit: Audit;
}
