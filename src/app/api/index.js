import { Router } from 'express';
import emailRouter from './email/email.route.js';


const router = Router();

router.use('/email', emailRouter);


export default router;
