import { COLLECTION_EMAIL_SCHEDULES } from '../config/index.js';
import { getCollection } from './connection.js';

export const emailScheduleModel = getCollection(COLLECTION_EMAIL_SCHEDULES);
