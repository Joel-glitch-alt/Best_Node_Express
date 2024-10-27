const getStudents = "SELECT * FROM students";

const getStudentById = "SELECT * FROM students WHERE ID =$1";

const addStudent = `INSERT INTO students (name, email, age, dob, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

const updateStudent = `UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5 RETURNING *`;

const deleteStudentById = `DELETE FROM students WHERE id = $1 RETURNING *`;

const checkEmailExists = `SELECT * FROM students WHERE email = $1`;

const getUserByNameAndEmail = 'SELECT * FROM students WHERE name = $1 AND email = $2';


//const registerStudent = 'INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email'

module.exports = {
    //registerStudent,
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudentById,
    checkEmailExists,
    getUserByNameAndEmail 
}