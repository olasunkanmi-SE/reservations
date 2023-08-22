import { AuditMapper } from "@app/shared-kernel/application/audit";
import { IMapper } from "@app/shared-kernel/domain";
import { Injectable } from "@nestjs/common";
import { UserDataModel } from "./schema/user.schema";
import { User } from "./user";

@Injectable()
export class UserMapper implements IMapper<User, UserDataModel> {
  constructor(private readonly auditMapper: AuditMapper) {}
  toDomain(model: UserDataModel): User {
    const { email, password, _id } = model;
    const user: User = User.create({ email, password, audit: this.auditMapper.toDomain(model) }, _id).getValue();
    return user;
  }

  toPersistence(entity: User): UserDataModel {
    const { email, password, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    } = audit;
    const userDocument: UserDataModel = {
      _id: entity.id,
      email,
      password,
      auditCreatedBy,
      auditCreatedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
    };
    return userDocument;
  }
}
