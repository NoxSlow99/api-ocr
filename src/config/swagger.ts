import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OCR API",
      version: "1.0.0",
      description:
        "API para autenticación de usuarios, extracción de texto OCR y gestión de usuarios.",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Rutas donde leer los comentarios
  apis: [
    "./src/routes/*.ts",
    // "./src/dto/**/*.ts"
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
