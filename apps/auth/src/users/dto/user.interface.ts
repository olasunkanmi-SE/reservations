import { Audit } from "@app/shared-kernel/domain";

export class IUser {
  email: string;
  password: string;
  audit: Audit;
}
