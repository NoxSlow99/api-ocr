import { Request, Response } from "express";
import { OcrDto } from "../dto/request/ocrRequest.dto";
import { detectFileType } from "../utils";
import { BadRequestException } from "../utils/errors/http-errors";
import { extractTextFromIneService } from "../services/ocrIne.service";

export const extractTextFromIne = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { imageFront } = req.body as OcrDto;

  const imageFrontBuffer = Buffer.from(imageFront, "base64");

  const fileTypeFront = detectFileType(imageFrontBuffer);

  if (fileTypeFront === "unknown") {
    throw new BadRequestException(
      "Formato de imagen no soportado. Debe ser JPEG o PNG"
    );
  }

  const response = await extractTextFromIneService(imageFrontBuffer);

  res.status(200).json(response);
};
