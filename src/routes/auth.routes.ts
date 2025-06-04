import express from "express";
import { validateDto } from "../middleware/validate.middleware";
import { login, register } from "../controller/auth.controller";
import { LoginDto, UserRegisterDto } from "../dto/request/index";

const router = express.Router();

router.post("/register", validateDto(UserRegisterDto), register);
router.post("/login", validateDto(LoginDto), login);

export default router;
