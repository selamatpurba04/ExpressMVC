const {
  Router,
  createHandler,
  schemaValidation,
  bodyParser
} = require('../../lib');

const { addEmployeeHandler } = require('./addEmployeeHandler');
const { employmentSchema: { addEmployeeSchema } } = require('../../models');

const router = Router();

router.post(
  '/employees',
  bodyParser.json(),
  schemaValidation({ body: addEmployeeSchema }),
  createHandler(addEmployeeHandler)
);

module.exports = [router];
