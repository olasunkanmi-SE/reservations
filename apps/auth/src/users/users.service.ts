import { Audit, Result } from "@app/shared-kernel/domain";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "apps/book/src/constants/contstants";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUserRepository } from "./dto/user-repository.interface";
import { User } from "./user";
import { UserMapper } from "./user.mapper";
import { throwApplicationError } from "@app/shared-kernel/utils/exception.instance";
import { UserParser, UserResponse } from "./user.parser";

@Injectable()
export class UsersService {
  constructor(
    @Inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper
  ) {}

  async createUser(props: CreateUserDto): Promise<Result<UserResponse>> {
    const audit: Audit = Audit.create({
      auditCreatedBy: "Ola",
      auditCreatedDateTime: new Date().toISOString(),
    }).getValue();
    const user = User.create({ ...props, audit }).getValue();
    const userDoc = this.userMapper.toPersistence(user);
    const result = await this.userRepository.create(userDoc);
    if (!result) {
      throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured, try again later");
    }
    return Result.ok(UserParser.createUserResponse(result.getValue()));
  }
}
