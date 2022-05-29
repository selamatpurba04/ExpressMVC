const {
  Router,
  createHandler,
  schemaValidation,
} = require('../../lib');

const { deleteEmployeeHandler } = require('./deleteEmployeeHandler');
const { employmentSchema: { requestEmployeeSchema } } = require('../../models');

const router = Router();

router.delete(
  '/employees/:id',
  schemaValidation({ params: requestEmployeeSchema }),
  createHandler(deleteEmployeeHandler)
);

module.exports = [router];
