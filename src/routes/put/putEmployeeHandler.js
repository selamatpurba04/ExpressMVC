/**
 * putEmployeeHandler
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 *
 */
const putEmployeeHandler = async (req, res) => {
  const {
    params: { id },
    body
  } = req;

  const employees = res.locals.employmentService.put(id, body);

  return res.send(employees);
};

module.exports = { putEmployeeHandler };
