import express from 'express';
import { verifyUser } from '../middlewares/authMiddlewares.js'; 
import { obtenerDatosProtegidos } from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyUser, obtenerDatosProtegidos);

export default router;