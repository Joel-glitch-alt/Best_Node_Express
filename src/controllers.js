const pool = require('../src/database/dbConfig');
const queries = require("./database/queries");
const bcrypt = require('bcrypt');  

// Get all students
const getStudents = (req, res, next) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) return next(error);

    res.status(200).json({
      message: "successful",
      data: results.rows
    });
  });
};

// Get Student By ID
const getStudentById = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) return next(error);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({
      message: 'Student found',
      data: results.rows[0]
    });
  });
};

// Adding Student
const addStudent = async (req, res, next) => {
  const { name, email, age, dob, password } = req.body;

  if (!name || !email || !age || !dob || !password) {
    return res.status(400).json({
      message: "Please provide all required fields: name, email, age, dob, and password"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.addStudent, [name, email, age, dob, hashedPassword]);

    res.status(201).json({
      message: 'Student added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

// Updating Student Details
const updateStudent = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;

  if (!name || !email || !age || !dob) {
    return res.status(400).json({
      message: "Please provide all fields: name, email, age, and dob"
    });
  }

  try {
    const result = await pool.query(queries.updateStudent, [name, email, age, dob, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Student with id ${id} not found` });
    }
    res.status(200).json({
      message: 'Student updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

// Delete Student By ID
const deleteStudentById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(queries.deleteStudentById, [id]);
    if (results.rowCount === 0) {
      return res.status(404).json({ message: `Student with id ${id} not found` });
    }
    res.status(200).json({
      message: `Student with id ${id} deleted successfully`,
      data: results.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

// Check if Email Exists
const checkEmailExists = (req, res, next) => {
  const { email } = req.body;
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) return next(error);
    if (results.rows.length > 0) {
      return res.status(400).json({ message: `Email ${email} is already registered` });
    }
    next();
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudentById,
  checkEmailExists,
};
