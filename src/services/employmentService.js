const { report } = require('process');
const { throwIfMissing } = require('../lib');
const { SystemError, ConflictError, NotFoundError } = require('../lib');

/**
 * EmploymentService
 */
class EmploymentService {
  /**
   * constructors
   * @param {object} opts - opts
   */
  constructor(opts) {
    throwIfMissing(opts.config, 'must provide opts.config');
    throwIfMissing(opts.logger, 'must provide opts.logger');
    throwIfMissing(opts.dataEmployees, 'must provide opts.dataEmployees');

    Object.assign(this, opts);
  }

  /**
   * Find employee from data in memory
   * @param {number} id - Employee Id
   * @param {boolean} i - flag to find index only
   * @returns {object} employee
   */
  findEmployee(id, i = false) {
    let employee = this.dataEmployees.find(e => e.employeeId == id);
    if (i) {
      employee = this.dataEmployees.findIndex(e => e.employeeId == id);
    }

    return employee;
  }

  /**
   * Find Direct Reports
   * @param {number} id - Employee Id
   * @param {array} allReporters - array of reporters
   * @returns {array} reporters
   */
  findReporter(id) {
    let reporters = this.dataEmployees.filter(e => e.managerId == id);
    if (reporters) {
      for (let i in reporters) {
        let reporter = reporters[i];
        const anotherReporter = this.findReporter(reporter.employeeId);
        if (anotherReporter.length) {
          reporter.directReports = anotherReporter;
        }
      }
    }

    return reporters;
  }

  /**
   * Find Employee by Id and tree of direct reports
   * @param {number} id - Employee Id
   * @param {boolean} includeReportingTree - flag to show tree of direct reports
   * @returns {object} response of employee
   */
   employee(id, includeReportingTree) {
    try {
      let res;
      const employee = this.findEmployee(id);
      if (employee) {
        res = { ...employee };
        
        const getManager = this.findEmployee(employee.managerId);
        if (getManager) {
          res.manager = { ...getManager };
        }

        if (includeReportingTree === 'true') {
          const reporters = this.findReporter(id);
          res.directReports = reporters;
        }
      } else {
        throw new NotFoundError('Employee Not found');
      }

      return res;
    } catch (error) {
      this.logger.error({ error }, `Error on employee: ${error}`);
      throw new SystemError(error.message, error.code, error.statusCode);
    }
  }

  /**
   * Find employees
   * @returns {object} response of listEmployees
   */
  listEmployees() {
    try {
      return this.dataEmployees;
    } catch (error) {
      this.logger.error({ error }, `Error on listEmployees: ${error}`);
      throw new SystemError();
    }
  }

  /**
   * Add employee to data in memory
   * @param {object} args - args
   * @returns {object} response of add
   */
  add(args) {
    const {
      employeeId,
      name,
      status,
      managerId
    } = args;

    try {
      let res;
      const checkExistedEmployee = this.findEmployee(employeeId);
      if (!checkExistedEmployee) {
        const checkExistedManager = this.findEmployee(managerId);
        if (checkExistedManager) {
          this.dataEmployees.push(args);
          res = {
            employeeId,
            name,
            status,
            manager: { ...checkExistedManager }
          }
        } else{
          throw new NotFoundError('Manager Not found');
        }
      } else {
        throw new ConflictError('Employee already exists');
      }

      return res;
    } catch (error) {
      this.logger.error({ error }, `Error on add: ${error}`);
      throw new SystemError(error.message, error.code, error.statusCode);
    }
  }

  /**
   * Delete employee from data in memory
   * @param {number} id - Employee Id
   * @returns {object} status
   */
  delete(id) {
    try {
      const employeeIndex = this.findEmployee(id, true);
      if (employeeIndex> -1) {
        this.dataEmployees.splice(employeeIndex, 1);
        return { status: true };
      } else {
        throw new NotFoundError('Invalid employee Id supplied');
      }
    } catch (error) {
      this.logger.error({ error }, `Error on delete: ${error}`);
      throw new SystemError(error.message, error.code, error.statusCode);
    }
  }

  /**
   * Update employee to data in memory
   * @param {number} id - Employee Id
   * @param {object} args - data to update
   * @returns {object} response of put
   */
    put(id, args) {
      const {
        employeeId,
        name,
        status,
        manager: { employeeId: managerId }
      } = args;
  
      try {
        let res;
  
        const indexEmployee = this.findEmployee(id, true);
        if (indexEmployee > -1) {
          const checkExistedEmployee = this.findEmployee(employeeId);
          if (checkExistedEmployee && employeeId != id) {
            throw new ConflictError('Employee already exists');
          }

          const checkExistedManager = this.findEmployee(managerId);
          if (checkExistedManager) {
            this.dataEmployees[indexEmployee] = {
              employeeId,
              name,
              status,
              managerId
             };

            res = {
              employeeId,
              name,
              status,
              manager: { ...checkExistedManager }
            }
          } else{
            throw new NotFoundError('Manager Not found');
          }
        } else {
          throw new NotFoundError('Employee Not Found');
        }
  
        return res;
      } catch (error) {
        this.logger.error({ error }, `Error on add: ${error}`);
        throw new SystemError(error.message, error.code, error.statusCode);
      }
    }
}

module.exports = EmploymentService;
