const { Router } = require("express");
const controller = require("./controllers");

const router = Router();

// Define the routes and their associated controller functions
router.get("/", controller.getStudents); // Get all students

router.get("/:id", controller.getStudentById); // Get a student by ID

// Check if email exists before adding a student
router.post("/add", controller.checkEmailExists, controller.addStudent); 

router.put('/:id', controller.updateStudent); 

router.delete('/:id', controller.deleteStudentById); 

//router.post("/register", controller.registerStudent); 

module.exports = router;
