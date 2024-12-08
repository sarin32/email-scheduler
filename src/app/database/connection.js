import { Collection, MongoClient } from 'mongodb';
import { DATABASE_EMAIL_SCHEDULER, DATABASE_SETTINGS } from '../config/index.js';

const client = new MongoClient(DATABASE_SETTINGS.URL);

export async function startConnection() {
  if (!client) {
    await client.connect();
  }
};

/**
 * 
 * @param {string} collectionName 
 * @returns {Collection}
 */
export function getCollection(collectionName) {
  return client.db(DATABASE_EMAIL_SCHEDULER).collection(collectionName);
};
