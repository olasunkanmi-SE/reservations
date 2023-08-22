import { IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
