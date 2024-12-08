import { SCHEDULE_STATUS } from "../config/constants.js";
import { emailScheduleRepository } from "../database/index.js";
import { BadRequestError, ConflictError, NotFoundError } from "../errors/index.js";
import { sendEmail } from "../utils/email.util.js";
import { reportError } from "../utils/error.util.js";
import { getStartOfMinute } from "../utils/timestamp-util.js";

export async function initSendEmailByScheduledTime() {
  sendCurrentScheduledEmails()
  setInterval(sendCurrentScheduledEmails, 60000);
}

async function sendCurrentScheduledEmails() {
  const curTime = getStartOfMinute(new Date())

  const scheduleList = await emailScheduleRepository.getAllScheduleListByScheduleTime({ scheduledAt: curTime })

  scheduleList.forEach(async ({
    _id,
    subject,
    body,
    to,
    cc,
    bcc
  }) => {
    try {
      await sendEmail({ html: body, subject, text: body, bcc, cc, to })
      emailScheduleRepository.updateScheduleStatus({ scheduleId: _id, status: SCHEDULE_STATUS.SENT }).catch(reportError)
    } catch (error) {
      emailScheduleRepository.updateScheduleStatus({ scheduleId: _id, status: SCHEDULE_STATUS.ERRORRED }).catch(reportError)
    }
  })
}

export async function createEmailSchedule({ body, scheduledAt, subject, bcc, cc, to }) {

  const scheduledAtDate = getStartOfMinute(scheduledAt)

  if (!bcc.length && !cc.length && !to.length) throw new BadRequestError('At least one recepient must be there')

  const curTime = getStartOfMinute(new Date())

  if (curTime >= scheduledAtDate) throw new BadRequestError('Schedule date must be greater than current time')

  return await emailScheduleRepository.createEmailSchedule({
    body, scheduledAt: scheduledAtDate, subject, bcc, cc, to
  })
}


export async function deleteSchedule({ scheduleId }) {
  const schedule = await emailScheduleRepository.getSchedule({ scheduleId })

  if (!schedule) throw new NotFoundError('Schedule not found');

  if (schedule.status != SCHEDULE_STATUS.SCHEDULED) throw new ConflictError('Email Already sent, Can not be deleted');

  await emailScheduleRepository.deleteEmailSchedule({ scheduleId })

  return { deletedId: scheduleId }
}

export async function updateSchedule({ scheduleId, bcc, body, cc, scheduledAt, subject, to }) {
  const schedule = await emailScheduleRepository.getSchedule({ scheduleId })

  if (!schedule) throw new NotFoundError('Schedule not found');

  if (schedule.status != SCHEDULE_STATUS.SCHEDULED) throw new ConflictError('Email Already sent, Can not be updated');

  await emailScheduleRepository.updateSchedule({ scheduleId, bcc, body, cc, scheduledAt, subject, to })

  return { updatedId: scheduleId }
}

export async function getSchedules({ status = '' }) {
  const query = {}
  if (status) query.status = status

  return await emailScheduleRepository.getAllScheduleList({ query })
}