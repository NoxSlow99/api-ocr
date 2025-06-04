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

router.post(
  "/add-information",
  authenticateToken,
  validateDto(UserInformationDto),
  addUserInformation
);
router.patch(
  "/update",
  authenticateToken,
  validateDto(UpdateUserProfileDto),
  updateUser
);
router.delete("/delete", authenticateToken, deleteUser);

export default router;
