import { SCHEDULE_STATUS } from "../../config/constants.js";
import { emailScheduleModel } from "../models.js";

export async function createEmailSchedule({ subject, body, scheduledAt, to = [], cc = [], bcc = [] }) {
  const result = await emailScheduleModel.insertOne({
    subject,
    body,
    scheduledAt,
    to,
    cc,
    bcc,
    createdAt: new Date(),
    status: SCHEDULE_STATUS.SCHEDULED
  });

  if (!result.acknowledged) {
    throw new Error('Failed to create email schedule');
  }

  return {
    id: result.insertedId,
  };
}

export async function isScheduleExists({ scheduleId }) {
  const task = await emailScheduleModel.findOne(
    { _id: scheduleId },
    { projection: { _id: 1 } }
  )
  return Boolean(task)
}

export async function getSchedule({ scheduleId }) {
  const task = await emailScheduleModel.findOne(
    { _id: scheduleId },
  )
  return task
}

export async function updateSchedule({ scheduleId, subject, body, scheduledAt, cc, bcc, to }) {
  const setData = {}
  if (subject) setData.subject = subject
  if (body) setData.bodydescription = body
  if (scheduledAt) setData.scheduledAt = scheduledAt
  if (to) setData.to = to
  if (cc) setData.cc = cc
  if (bcc) setData.bcc = bcc

  const response = await emailScheduleModel.updateOne(
    { _id: scheduleId },
    { $set: setData }
  );

  if (!response.acknowledged || response.modifiedCount !== 1) {
    throw new Error('Failed to update email schedule');
  }
}


export async function updateScheduleStatus({ scheduleId, status }) {
  const setData = { status }

  const response = await emailScheduleModel.updateOne(
    { _id: scheduleId },
    { $set: setData }
  );

  if (!response.acknowledged || response.modifiedCount !== 1) {
    throw new Error('Failed to update email schedule');
  }
}

export async function getAllScheduleListByScheduleTime({ scheduledAt, projection = {}, sort = {} }) {
  const data = await emailScheduleModel.find(
    { scheduledAt, status: SCHEDULE_STATUS.SCHEDULED },
    { projection }
  )
    .sort(sort)
    .toArray()

  return data
}

export async function deleteEmailSchedule({ scheduleId }) {
  const response = await emailScheduleModel.deleteOne({ _id: scheduleId })
  if (!response.acknowledged || response.deletedCount !== 1) {
    throw new Error('Failed to delete email schedule data');
  }
}


export async function getAllScheduleList({ query = {}, projection = {} }) {
  const data = await emailScheduleModel.find(
    query,
    { projection }
  )
    .sort({ createdAt: -1 })
    .toArray()

  return data
}

