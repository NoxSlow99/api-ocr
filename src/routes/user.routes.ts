import express from "express";
import { UpdateUserProfileDto, UserInformationDto } from "../dto/request";
import { authenticateToken } from "../middleware/jwt.middleware";
import {
  addUserInformation,
  deleteUser,
  updateUser,
} from "../controller/user.controller";
import { validateDto } from "../middleware/validate.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints de usuario
 */

/**
 * @swagger
 * /user/add-information:
 *   post:
 *     summary: Agrega información adicional del usuario.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastNames:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: number
 *               dateOfBirth:
 *                 type: string
 *               curp:
 *                 type: string
 *               gender:
 *                 type: string
 *             required:
 *               - name
 *               - lastNames
 *               - phoneNumber
 *               - name
 *               - lastNames
 *               - phoneNumber
 *               - address
 *               - postalCode
 *               - dateOfBirth
 *               - curp
 *               - gender
 *     responses:
 *       200:
 *          description: Información del usuario actualizada.
 *       400:
 *          description: Datos inválidos.
 *       401:
 *          description: Token inválido o no enviado.
 *       409:
 *          description: Información del usuario ya existe
 */
router.post(
  "/add-information",
  authenticateToken,
  validateDto(UserInformationDto),
  addUserInformation
);

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: Actualiza el perfil del usuario.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastNames:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: number
 *               dateOfBirth:
 *                 type: string
 *               curp:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente.
 *       400:
 *         description: Al menos un dato se tiene que enviar para hacer la actualizacion.
 *       401:
 *         description: Token inválido o no enviado.
 */
router.patch(
  "/update",
  authenticateToken,
  validateDto(UpdateUserProfileDto),
  updateUser
);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Elimina al usuario autenticado y su información relacionada.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       401:
 *         description: Token inválido o no enviado.
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/delete", authenticateToken, deleteUser);

export default router;
