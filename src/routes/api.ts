import express from 'express';
import resolve from "../helpers/resolve";
import ApiController from "../controllers/apiController";

const router = express.Router();

router.get('/', resolve(ApiController).index);

export default router;