import express from "express";
import { validateDto } from "../middleware/validate.middleware";
import { login, register } from "../controller/auth.controller";
import { LoginDto, UserRegisterDto } from "../dto/request/index";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/register", validateDto(UserRegisterDto), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *                 example: email or username
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *             required:
 *               - credential
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", validateDto(LoginDto), login);

export default router;
