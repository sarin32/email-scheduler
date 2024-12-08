import Joi from 'joi';

export function objectIdSchema() {
  let schema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
  return schema;
}
