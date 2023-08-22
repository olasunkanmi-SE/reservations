import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "apps/book/src/constants/contstants";
import { IUserRepository } from "./dto/user-repository.interface";

@Injectable()
export class UsersService {
  constructor(@Inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository) {}
}
