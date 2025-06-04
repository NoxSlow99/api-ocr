import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class UserInformationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastNames!: string;
  
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(5, 5)
  postalCode!: number;

  @IsString()
  @IsNotEmpty()
  dateOfBirth!: string;

  @IsString()
  @IsNotEmpty()
  curp!: string;

  @IsString()
  @IsNotEmpty()
  gender!: string;
}
