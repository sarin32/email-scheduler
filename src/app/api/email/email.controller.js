import { BadRequestError } from '../../errors/index.js';
import { emailScheduleService } from '../../services/index.js'
import Joi from 'joi';
import { objectIdSchema } from '../../utils/schema-validator.js';
import { objectId } from '../../utils/mongo.util.js';
import { SCHEDULE_STATUS } from '../../config/constants.js';


const createScheduleSchema = Joi.object({
  subject: Joi.string().required().min(1),
  body: Joi.string().required().min(1),
  bcc: Joi.array().items(Joi.string().email().required()).default([]),
  to: Joi.array().items(Joi.string().email().required()).default([]),
  cc: Joi.array().items(Joi.string().email().required()).default([]),
  scheduledAt: Joi.date().required(),
}).required()

const updateScheduleSchema = Joi.object({
  subject: Joi.string().required().min(1),
  body: Joi.string().required().min(1),
  bcc: Joi.array().items(Joi.string().email().required()).default([]),
  to: Joi.array().items(Joi.string().email().required()).default([]),
  cc: Joi.array().items(Joi.string().email().required()).default([]),
  scheduledAt: Joi.date().required(),
}).required()

const updateScheduleParamsSchema = Joi.object({
  id: objectIdSchema()
}).required()


const deleteScheduleParamsSchema = Joi.object({
  id: objectIdSchema()
}).required()


export async function createSchedule(req, res, next) {
  try {
    const { error, value } = createScheduleSchema.validate(req.body);

    if (error) throw new BadRequestError(error.message);

    const { subject, body, bcc, cc, scheduledAt, to } = value
    const result = await emailScheduleService.createEmailSchedule({
      subject, body, bcc, cc, scheduledAt, to
    });

    res.json(result);

  } catch (error) {
    next(error)
  }
}

export async function updateSchedule(req, res, next) {
  try {
    const { error, value: reqbody } = updateScheduleSchema.validate(req.body);

    if (error) throw new BadRequestError(error.message);

    const { error: paramsError, value: reqParams } = updateScheduleParamsSchema.validate(req.params);

    if (paramsError) throw new BadRequestError(error.message);

    const { subject, body, bcc, cc, scheduledAt, to } = reqbody
    const { id } = reqParams

    const result = await emailScheduleService.updateSchedule({
      subject, body, bcc, cc, scheduledAt, to, scheduleId: objectId(id)
    });

    res.json(result);

  } catch (error) {
    next(error)
  }
}

export async function deleteSchedule(req, res, next) {
  try {
    const { error, value } = deleteScheduleParamsSchema.validate(req.params);

    if (error) throw new BadRequestError(error.message);

    const { id } = value
    const result = await emailScheduleService.deleteSchedule({
      scheduleId: objectId(id)
    });

    res.json(result);

  } catch (error) {
    next(error)
  }
}


export async function getFailedSchedules(req, res, next){
  try {
    const result = await emailScheduleService.getSchedules({status: SCHEDULE_STATUS.ERRORRED})
    res.json(result);

  } catch (error) {
    next(error)
  }
}

export async function getScheduledSchedules(req, res, next){
  try {
    const result = await emailScheduleService.getSchedules({status: SCHEDULE_STATUS.SCHEDULED})
    res.json(result);

  } catch (error) {
    next(error)
  }
}

export async function getSentSchedules(req, res, next){
  try {
    const result = await emailScheduleService.getSchedules({status: SCHEDULE_STATUS.SENT})
    res.json(result);

  } catch (error) {
    next(error)
  }
}

export async function getAllSchedules(req, res, next){
  try {
    const result = await emailScheduleService.getSchedules({status: ''})
    res.json(result);

  } catch (error) {
    next(error)
  }
}