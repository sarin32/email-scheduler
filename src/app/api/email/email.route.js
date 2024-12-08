import { Router } from "express";
import {
  createSchedule,
  deleteSchedule,
  updateSchedule,
  getAllSchedules,
  getFailedSchedules,
  getScheduledSchedules,
  getSentSchedules
} from './email.controller.js';


const router = Router()


router.get('/', getAllSchedules)

router.get('/failed', getFailedSchedules)

router.get('/scheduled', getScheduledSchedules)

router.get('/sent', getSentSchedules)

router.delete('/:id', deleteSchedule)

router.post('/', createSchedule)

router.put('/:id', updateSchedule)

export default router;
