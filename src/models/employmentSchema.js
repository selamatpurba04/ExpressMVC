const Joi = require('joi');

const addEmployeeSchema = Joi.object({
  employeeId: Joi.number().required(),
  name: Joi.string().required(),
  status:  Joi.string().required(),
  managerId: Joi.number().required(),
  directReports: Joi.array()
}).label('addEmployeeSchema');

const requestEmployeeSchema = Joi.object({
  id: Joi.number().required()
}).label('requestAccessSchema');

const putEmployeeSchema = Joi.object({
  employeeId: Joi.number().required(),
  name: Joi.string().required(),
  status:  Joi.string().required(),
  manager: Joi.object({
    employeeId: Joi.number().required()
  }),
  directReports: Joi.array()
}).label('putEmployeeSchema');

module.exports = {
  addEmployeeSchema,
  requestEmployeeSchema,
  putEmployeeSchema
};
