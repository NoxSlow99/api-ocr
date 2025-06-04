import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  lastNames!: string;

  @IsOptional()
  @IsString()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsNumber()
  @Length(5, 5)
  postalCode!: number;

  @IsOptional()
  @IsString()
  dateOfBirth!: string;

  @IsOptional()
  @IsString()
  curp!: string;

  @IsOptional()
  @IsString()
  gender!: string;
}
