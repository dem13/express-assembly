import express from 'express';
import action from "../helpers/action";

export default async () => {
  const router = express.Router();

  router.get('/', action('ApiController.index'));

  router.post('/admin', action('Admin/AdminController.index'));

  return router
};