import express from 'express';
const router = express.Router();
import { signIn, signUp } from "../controller/userAuth.js";


router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

export const userRouter = router;