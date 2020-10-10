import express from 'express';
import resolve from "../helpers/resolve";
import ApiController from "../controllers/apiController";
import AuthController from "../controllers/authController";
import asyncHandler from "express-async-handler";

const router = express.Router();

const authController = resolve(AuthController);

router.get('/', resolve(ApiController).index);

router.post('/auth/register', asyncHandler(authController.register));

export default router;