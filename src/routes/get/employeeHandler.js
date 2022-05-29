/**
 * employeeHandler
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 *
 */
const employeeHandler = (req, res) => {
  const {
    params: { id },
    query: { includeReportingTree }
  } = req;

  const result = res.locals.employmentService.employee(id, includeReportingTree);

  return res.send(result);
};

module.exports = { employeeHandler };
