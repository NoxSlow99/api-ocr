import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from "class-validator";

export class UserRegisterDto {
  @MinLength(3)
  @IsString()
  username!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password!: string;
}
