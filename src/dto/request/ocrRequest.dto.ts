import { IsNotEmpty, IsString } from "class-validator";

export class OcrDto {
  @IsNotEmpty({ message: "Imagen frontal en base64 requerido" })
  @IsString()
  imageFront!: string;
}
