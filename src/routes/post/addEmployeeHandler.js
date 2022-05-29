/**
 * addEmployeeHandler
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 *
 */
const addEmployeeHandler = (req, res) => {
  const { body } = req;
  const employees = res.locals.employmentService.add(body);

  return res.send(employees);
};

module.exports = { addEmployeeHandler };
