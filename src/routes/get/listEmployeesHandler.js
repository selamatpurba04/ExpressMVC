/**
 * listEmployeesHandler
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 *
 */
const listEmployeesHandler = (req, res) => {
  const result = res.locals.employmentService.listEmployees();

  return res.send(result);
};

module.exports = { listEmployeesHandler };
