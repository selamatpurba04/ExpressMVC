const {
  Router,
  createHandler,
  schemaValidation
} = require('../../lib');

const { employeeHandler } = require('./employeeHandler');
const { listEmployeesHandler } = require('./listEmployeesHandler');
const { employmentSchema: { requestEmployeeSchema } } = require('../../models');

const router = Router();

router.get(
  '/employees',
  createHandler(listEmployeesHandler)
);

router.get(
  '/employees/:id',
  schemaValidation({ params: requestEmployeeSchema }),
  createHandler(employeeHandler)
);

module.exports = [router];
