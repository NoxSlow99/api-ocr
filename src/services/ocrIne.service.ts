import googleVision from "@google-cloud/vision";
import { BadRequestException } from "../utils/errors/http-errors";
import { InformationResponse } from "../dto/response/informationResponse.dto";

const client = new googleVision.ImageAnnotatorClient();

export const extractTextFromIneService = async (
  imageFrontBuffer: Buffer
): Promise<InformationResponse> => {
  const [frontResult] = await client.documentTextDetection({
    image: { content: imageFrontBuffer },
  });

  const fullTextFront = frontResult.fullTextAnnotation?.text;

  if (!fullTextFront) {
    throw new BadRequestException("No se pudo extraer texto de la imagen");
  }

  return extractTextImageFront(fullTextFront);
};

const extractTextImageFront = (text: string): InformationResponse => {
  const formatText = text.split("\n").map((line) => line.trim());

  const namesAndSurnames = extractName(formatText);
  const address = extractAddress(formatText);
  const postalCode = address.match(/\d{5}/g)?.[0] ?? "";
  const birthDate = extractBirthDate(formatText);

  return {
    name: namesAndSurnames[2] ?? "",
    lastNames: `${namesAndSurnames[0] || ""} ${namesAndSurnames[1] || ""}`,
    address,
    postalCode,
    dateBirth: birthDate,
    curp: extractCurp(formatText),
    gender: extractGender(formatText),
  };
};

const extractName = (rawText: string[]): string[] => {
  const startIndex = rawText.findIndex((line) => /NOMBRE/i.test(line));

  const endIndex = rawText.findIndex((line) => /DOMICILIO/i.test(line));

  // Si no se encuentra "NOMBRE" o "DOMICILIO", devolver un arreglo vacío
  if (startIndex === -1 || endIndex === -1) {
    return [];
  }

  const selectedLines = rawText.slice(startIndex + 1, endIndex);

  // Filtrar las líneas no deseadas
  const filteredLines = selectedLines.filter((line) => {
    // Eliminar líneas que contienen "FECHA DE NACIMIENTO", números, caracteres especiales como "/", y "SEXO"
    const hasInvalidContent =
      /FECHA DE NACIMIENTO/i.test(line) ||
      /\d/.test(line) ||
      /[\/]/.test(line) ||
      /SEXO/i.test(line);

    // Devuelve true si la línea no tiene contenido no deseado
    return !hasInvalidContent;
  });

  return filteredLines;
};

const extractAddress = (rawText: string[]): string => {
  // Encontrar la línea que contiene la palabra "DOMICILIO"
  const startIndex = rawText.findIndex((line) => /DOMICILIO/.test(line));

  // Seleccionar las tres líneas siguientes a la línea que contiene "DOMICILIO"
  const selectedLines = rawText.slice(startIndex + 1, startIndex + 4);

  const text = selectedLines.join(" ");

  return text;
};

const extractBirthDate = (rawText: string[]): string => {
  for (const line of rawText) {
    const dateMatch = RegExp(/(\d{2})\/(\d{2})\/(\d{4})/).exec(line);

    if (dateMatch) {
      return `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
    }
  }

  return "";
};

const extractCurp = (rawText: string[]): string => {
  for (let i = 0; i < rawText.length; i++) {
    // Buscar líneas que contengan la palabra CURP
    if (rawText[i].includes("CURP")) {
      // Caso 1: CURP está en la misma línea
      const sameLineMatch = RegExp(/CURP\s*([A-Z0-9]{18})/i).exec(rawText[i]);
      if (sameLineMatch) {
        return sameLineMatch[1];
      }

      // Caso 2: CURP está en la siguiente línea
      if (i + 1 < rawText.length) {
        const nextLineMatch = RegExp(/^[A-Z0-9]{18}$/i).exec(rawText[i + 1]);
        if (nextLineMatch) {
          return nextLineMatch[0];
        }
      }
    }
  }

  return "";
};

const extractGender = (rawText: string[]): string => {
  // Buscar la línea que contiene "SEXO"
  const sexLine = rawText.find((line) => /SEXO\s+[A-Z]/.test(line)) ?? "";

  // Extraer la letra que sigue a "SEXO"
  const match = RegExp(/SEXO\s+([A-Z])/).exec(sexLine);
  return match ? match[1] : "";
};
