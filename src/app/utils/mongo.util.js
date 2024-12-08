import {ObjectId} from 'mongodb';

/**
 * wrapper fro mongodb objectid generation
 * @param {string} value 
 * @returns {ObjectId}
 */
export function objectId(value) {
  return new ObjectId(value);
}
