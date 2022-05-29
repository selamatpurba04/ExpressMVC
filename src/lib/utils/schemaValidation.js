const { BadUserInputError } = require('../../lib/errors');
/**
 * validating request
 * @param {object} payload - request payload
 * @param {object} schema - validation schema object
 * @returns {object} - return validated object
 */
 const validateSchema = (payload, schema) => {
  const result = schema.validate(payload);

  if (result.error) {
    throw new BadUserInputError(result.error.message);
  }

  return result.value;
};

/**
 * createValidation
 * @param {object} validation - validation schema [query, params, body, header]
 * @returns {promise} - return to next function
 */
const createValidation = validation => (req, res, next) => {
  const {
    headers: headersSchema,
    query: querySchema,
    params: paramsSchema,
    body: bodySchema
  } = validation;
  const {
    headers, query, params, body
  } = req;

  Object.assign(res.locals, {
    payload: {
      headers: headersSchema ? validateSchema(headers, headersSchema) : {},
      query: querySchema ? validateSchema(query, querySchema) : {},
      params: paramsSchema ? validateSchema(params, paramsSchema) : {},
      body: bodySchema ? validateSchema(body, bodySchema) : {}
    }
  });

  return next();
};

module.exports = createValidation;
