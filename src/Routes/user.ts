
import createUserController from '@controllers/createUserController';
import fetchUsersController from '@controllers/fetchUsersController';
import validateParamsHandler from '@middlewares/validateParamsHandler';
import express from 'express';
const router = express.Router();

router.post('/',
    validateParamsHandler('email, password'),
    createUserController);

router.get('/',
    fetchUsersController);

export default router;