const {
  Router,
  createHandler,
  schemaValidation,
  bodyParser
} = require('../../lib');

const { putEmployeeHandler } = require('./putEmployeeHandler');
const { employmentSchema: { requestEmployeeSchema, putEmployeeSchema } } = require('../../models');

const router = Router();

router.put(
  '/employees/:id',
  bodyParser.json(),
  schemaValidation({ params: requestEmployeeSchema, body: putEmployeeSchema }),
  createHandler(putEmployeeHandler)
);

module.exports = [router];
