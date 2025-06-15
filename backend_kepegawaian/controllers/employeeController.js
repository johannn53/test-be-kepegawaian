const { Employee, EmployeeProfile, EmployeeFamily, Education } = require('../models');
const summarizeFamily = require('../helpers/countFamily');

/**
 * @desc Get all active employees
 * @route GET /api/employees
 */
exports.getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees where is_active is true
    // Exclude createdAt and updatedAt fields from the result
    const employees = await Employee.findAll({
      where: { is_active: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return res.status(200).json({
      status: 200,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get one employee by ID, including profile, families, and educations
 * @route GET /api/employees/:id
 */
exports.getOneEmployee = async (req, res) => {
  try {
    // Find employee by primary key (id), and include related data
    const employee = await Employee.findByPk(req.params.id, {
      include: ['profile', 'families', 'educations'],
    });

    // Return 404 if employee not found
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    return res.status(200).json({
      status: 200,
      data: employee,
    });
    // res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Create a new employee with profile, families, and educations
 * @route POST /api/employees
 */
exports.createEmployee = async (req, res) => {
  const { employee, profile, families, educations } = req.body;
  try {
    // Create employee data to DB
    const newEmployee = await Employee.create(employee);

    // If profile exist, create employee profile data
    if (profile) {
      await EmployeeProfile.create({ ...profile, employee_id: newEmployee.id });
    }

    // If family exist, create employee family data
    if (families?.length) {
      await EmployeeFamily.bulkCreate(
        families.map((family) => ({
          ...family,
          employee_id: newEmployee.id,
        }))
      );
    }

    // If education exist, create employee education data
    if (educations?.length) {
      await Education.bulkCreate(
        educations.map((education) => ({
          ...education,
          employee_id: newEmployee.id,
        }))
      );
    }

    // Response
    return res.status(200).json({
      status: 200,
      message: 'Employee created successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update an existing employee by ID, including profile, families, and educations
 * @route PUT /api/employees/:id
 */
exports.updateEmployee = async (req, res) => {
  const { employee, profile, families, educations } = req.body;
  try {
    // *************** FIND EMPLOYEE BY PRIMARY KEY
    const employeeData = await Employee.findByPk(req.params.id);
    if (!employeeData) return res.status(404).json({ error: 'Employee not found' });

    // *************** UPDATE EMPLOYEE MAIN DATA
    await employeeData.update(employee);

    // *************** IF PROFILE EXISTS, UPDATE PROFILE DATA
    if (profile) {
      await EmployeeProfile.update(profile, { where: { employee_id: req.params.id } });
    }

    // *************** IF FAMILIES EXISTS, UPDATE FAMILY DATA
    if (families) {
      await EmployeeFamily.destroy({ where: { employee_id: req.params.id } });
      await EmployeeFamily.bulkCreate(families.map((family) => ({ ...family, employee_id: req.params.id })));
    }

    // *************** IF EDUCATION EXISTS, UPDATE EDUCATION DATA
    if (educations) {
      await Education.destroy({ where: { employee_id: req.params.id } });
      await Education.bulkCreate(educations.map((education) => ({ ...education, employee_id: req.params.id })));
    }

    // RETURN RESPONSE DATA
    return res.status(200).json({
      status: 200,
      message: 'Employee updated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * FUNCTION TO DELETE EMPLOYEE
 * @route DELETE /api/employees/:id
 * @returns
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // ********** UNCOMMNENT THIS FOR HARD DELETE DATA
    // await employee.destroy();

    // ********** UNCOMMENT THIS FOR SOFT DELETE DATA (is_active VALUE CHANGED TO FALSE)
    const employeeDataEdit = {
      is_active: false,
    };
    // UPDATE EMPLOYEE ACTIVE STATUS
    await Employee.update(employeeDataEdit, {
      where: {
        id: employee.id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get report of all employees with flattened fields (gender, age, education, family summary)
 * @route GET /api/employees/report
 */
exports.getEmployeeReport = async (req, res) => {
  try {
    // FETCH ALL EMPLOYEES WITH ASSOCIATED PROFILE, FAMILY, AND EDUCATION
    const employees = await Employee.findAll({
      include: ['profile', 'families', 'educations'],
    });

    // FORMAT EMPLOYEE DATA INTO REPORT FORMAT
    const report = employees.map((employee) => {
      const profile = employee.profile;
      const education = employee.educations?.[0]; // TAKE FIRST EDUCATION ENTRY
      const families = employee.families || [];

      // CALCULATE AGE FROM DATE OF BIRTH
      let age = null;
      if (profile?.date_of_birth) {
        const birthDate = new Date(profile.date_of_birth);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
      }

      // RETURN REPORT OBJECT
      return {
        employee_id: employee.id,
        nik: employee.nik,
        name: employee.name,
        is_active: employee.is_active,
        gender: profile?.gender || null,
        age: age,
        school_name: education?.name || null,
        level: education?.level || null,
        family: summarizeFamily(families),
      };
    });

    return res.status(200).json({
      status: 200,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
