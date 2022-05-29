/**
 * deleteEmployeeHandler
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 *
 */
const deleteEmployeeHandler = (req, res) => {
  const {
    params: { id }
  } = req;

  const employees = res.locals.employmentService.delete(id);

  return res.send(employees);
};

module.exports = { deleteEmployeeHandler };
