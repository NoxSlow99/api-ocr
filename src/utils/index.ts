import bcrypt from "bcrypt";
import { parse, isValid, format } from "date-fns";
import { BadRequestException } from "./errors/http-errors";

const SALT_ROUNDS = 15;

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const detectFileType = (
  file: Buffer
): "jpg" | "jpeg" | "png" | "unknown" => {
  const hex = file.toString("hex", 0, 8).toLowerCase();

  // JPEG
  if (
    hex.startsWith("ffd8ffe0") ||
    hex.startsWith("ffd8ffe1") ||
    hex.startsWith("ffd8ffe2")
  )
    return "jpeg";

  // PNG
  if (hex.startsWith("89504e47")) return "png";

  return "unknown";
};

export const convertDateFormat = (
  inputDate: string,
  inputFormat: string,
  outputFormat: string
): string => {
  const parsedDate = parse(inputDate, inputFormat, new Date());

  if (!isValid(parsedDate)) {
    throw new BadRequestException(`Formato de fecha invalido: ${inputDate}`);
  }

  return format(parsedDate, outputFormat);
};
