import { IsNumber, IsOptional, IsString } from "class-validator";

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
