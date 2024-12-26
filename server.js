
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require ('cors');
const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(bodyParser.json());




// Create a connection pool to MySQL
const db = mysql.createConnection({
  host: 'localhost',       // Your MySQL host
  user: 'mahmoud',            // Your MySQL username
  password: '01004905248',            // Your MySQL password
  database: 'uniomar' // Your database name
});



db.connect(err => {  
    if (err) throw err;  
    console.log('Database connected!');  
});  


// === Students Routes ===
app.post('/add-student', (req, res) => {
  const { studentID, name, departmentID, level } = req.body;
  const query = 'INSERT INTO students (studentID, name, departmentID, level) VALUES (?, ?, ?, ?)';
  db.query(query, [studentID, name, departmentID, level], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Student added successfully');
  });
});

app.put('/api/modify-student', (req, res) => {
  const { studentID, name, departmentID, level } = req.body;
  const query = 'UPDATE students SET name = ?, departmentID = ?, level = ? WHERE studentID = ?';
  db.query(query, [name, departmentID, level, studentID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Student modified successfully');
  });
});

app.delete('/api/delete-student/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM students WHERE studentID = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Student deleted successfully');
  });
});






// === Teachers Routes ===

app.post('/api/add-teacher', (req, res) => {
  const { teacherID, name, departmentID } = req.body;
  const query = 'INSERT INTO teachers (teacherID, name, departmentID) VALUES (?, ?, ?)';
  db.query(query, [teacherID, name, departmentID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Teacher added successfully');
  });
});

app.put('/api/modify-teacher', (req, res) => {
  const { teacherID, name, departmentID } = req.body;
  const query = 'UPDATE teachers SET name = ?, departmentID = ? WHERE teacherID = ?';
  db.query(query, [name, departmentID, teacherID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Teacher modified successfully');
  });
});

app.delete('/api/delete-teacher/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM teachers WHERE teacherID = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Teacher deleted successfully');
  });
});




// === Courses Routes ===

app.post('/api/add-course', (req, res) => {
  const { courseID, courseName, departmentID, credits } = req.body;
  const query = 'INSERT INTO courses (courseID, courseName, departmentID, credits) VALUES (?, ?, ?, ?)';
  db.query(query, [courseID, courseName, departmentID, credits], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Course added successfully');
  });
});

app.put('/api/modify-course', (req, res) => {
  const { courseID, courseName, departmentID, credits } = req.body;
  const query = 'UPDATE courses SET courseName = ?, departmentID = ?, credits = ? WHERE courseID = ?';
  db.query(query, [courseName, departmentID, credits, courseID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Course modified successfully');
  });
});

app.delete('/api/delete-course/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM courses WHERE courseID = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Course deleted successfully');
  });
});







// === Enrollment Routes ===

app.post('/api/add-enrollment', (req, res) => {
  const { studentID, courseID, semester } = req.body;
  const query = 'INSERT INTO enrollments (studentID, courseID, semester) VALUES (?, ?, ?)';
  db.query(query, [studentID, courseID, semester], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Enrollment added successfully');
  });
});


// Modify an existing enrollment
app.put('/api/modify-enrollment', (req, res) => {
  const { studentID, courseID, semester } = req.body;
  const query = 'UPDATE enrollments SET semester = ? WHERE studentID = ? AND courseID = ?';
  db.query(query, [semester, studentID, courseID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error modifying enrollment');
    }
    res.send('Enrollment modified successfully!');
  });
});


app.delete('/api/delete-enrollment', (req, res) => {
  const {studentID, courseID } = req.body;
  const query = 'DELETE FROM enrollments WHERE WHERE studentID = ? AND courseID = ?';
  db.query(query, [studentID, courseID ], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Enrollment deleted successfully');
  });
});




// === Grade Routes ===

app.post('/api/assign-grade', (req, res) => {
  const { studentID, courseID, grade } = req.body;
  const query = 'INSERT INTO grades (studentID, courseID, grade) VALUES (?, ?, ?)';
  db.query(query, [studentID, courseID, grade], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Grade assigned successfully');
  });
});

app.put('/api/modify-grade', (req, res) => {
  const { studentID, courseID, grade } = req.body;
  const query = 'UPDATE grades SET grade = ? WHERE studentID = ? AND courseID = ?';
  db.query(query, [grade, studentID, courseID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Grade modified successfully');
  });
});

app.delete('/api/delete-grade', (req, res) => {
  const {studentID, courseID} = req.body;
  const query = 'DELETE FROM grades WHERE studentID = ? AND courseID = ?';
  db.query(query, [studentID, courseID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }
    res.send('Grade deleted successfully');
  });
});






// Add a new schedule

app.post('/api/add-schedule', (req, res) => {
  const { courseID, teacherID, day, time, room } = req.body;
  const query = 'INSERT INTO schedules (courseID, teacherID, day, time, room) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [courseID, teacherID, day, time, room], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding schedule');
    }
    res.send('Schedule added successfully!');
  });
});

// Modify an existing schedule
app.put('/api/modify-schedule', (req, res) => {
  const { courseID, teacherID, day, time, room } = req.body;
  const query = 'UPDATE schedules SET day = ?, time = ?, room = ? WHERE courseID = ? AND teacherID = ?';
  db.query(query, [day, time, room, courseID, teacherID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error modifying schedule');
    }
    res.send('Schedule modified successfully!');
  });
});

// Delete a schedule
app.delete('/api/delete-schedule', (req, res) => {
  const {courseID, teacherID} = req.body;
  const query = 'DELETE FROM schedules WHERE courseID = ? AND teacherID = ?';
  db.query(query, [courseID ,teacherID ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting schedule');
    }
    res.send('Schedule deleted successfully!');
  });
});




// === Faculty Routes ===
// Add a new faculty

app.post('/api/add-faculty', (req, res) => {
  const { facultyID, facultyName } = req.body;
  if (!facultyID || !facultyName) {
    return res.status(400).json({ error: 'FacultyID and FacultyName are required' });
  }

  const query = 'INSERT INTO faculties (facultyID, facultyName) VALUES (?, ?)';
  db.query(query, [facultyID, facultyName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Faculty added successfully' });
  });
});

// Modify an existing faculty
app.put('/api/modify-faculty', (req, res) => {
  const { facultyID, facultyName } = req.body;
  if (!facultyID || !facultyName) {
    return res.status(400).json({ error: 'FacultyID and FacultyName are required' });
  }

  const query = 'UPDATE faculties SET facultyName = ? WHERE facultyID = ?';
  db.query(query, [facultyName, facultyID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Faculty updated successfully' });
  });
});

// Delete a faculty by ID
app.delete('/api/delete-faculty/:facultyID', (req, res) => {
  const { facultyID } = req.params;
  const query = 'DELETE FROM faculties WHERE facultyID = ?';
  db.query(query, [facultyID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  });
});




// === Department Routes ===
// Add a new department

app.post('/api/add-department', (req, res) => {
  const { departmentID, departmentName, facultyID } = req.body;
  if (!departmentID || !departmentName || !facultyID) {
    return res.status(400).json({ error: 'DepartmentID, DepartmentName, and FacultyID are required' });
  }

  const query = 'INSERT INTO departments (departmentID, departmentName, facultyID) VALUES (?, ?, ?)';
  db.query(query, [departmentID, departmentName, facultyID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Department added successfully' });
  });
});

// Modify an existing department
app.put('/api/modify-department', (req, res) => {
  const { departmentID, departmentName, facultyID } = req.body;
  if (!departmentID || !departmentName || !facultyID) {
    return res.status(400).json({ error: 'DepartmentID, DepartmentName, and FacultyID are required' });
  }

  const query = 'UPDATE departments SET departmentName = ?, facultyID = ? WHERE departmentID = ?';
  db.query(query, [departmentName, facultyID, departmentID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Department updated successfully' });
  });
});

// Delete a department by ID
app.delete('/api/delete-department/:departmentID', (req, res) => {
  const { departmentID } = req.params;
  const query = 'DELETE FROM departments WHERE departmentID = ?';
  db.query(query, [departmentID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ message: 'Department deleted successfully' });
  });
});








// Route to get all students
app.get('/api/students', (req, res) => {
  const query = 'SELECT * FROM students';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Failed to fetch students from the database.' });
    }
    res.status(200).json(results); // Sending the results back to the client as JSON
  });
});

// Route to get all teachers
app.get('/api/teachers', (req, res) => {
  const query = 'SELECT * FROM teachers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Failed to fetch teachers from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all courses
app.get('/api/courses', (req, res) => {
  const query = 'SELECT * FROM courses';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Failed to fetch courses from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all enrollments
app.get('/api/enrollments', (req, res) => {
  const query = 'SELECT * FROM enrollments';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching enrollments:', err);
      return res.status(500).json({ error: 'Failed to fetch enrollments from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all grades
app.get('/api/grades', (req, res) => {
  const query = 'SELECT * FROM grades';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching grades:', err);
      return res.status(500).json({ error: 'Failed to fetch grades from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all schedules
app.get('/api/schedules', (req, res) => {
  const query = 'SELECT * FROM schedules';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      return res.status(500).json({ error: 'Failed to fetch schedules from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all faculties
app.get('/api/faculties', (req, res) => {
  const query = 'SELECT * FROM faculties';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching faculties:', err);
      return res.status(500).json({ error: 'Failed to fetch faculties from the database.' });
    }
    res.status(200).json(results);
  });
});

// Route to get all departments
app.get('/api/departments', (req, res) => {
  const query = 'SELECT * FROM departments';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return res.status(500).json({ error: 'Failed to fetch departments from the database.' });
    }
    res.status(200).json(results);
  });
});

// === Start the server ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



//auto port selections
//const getPort = require('get-port');
//getPort({ port: 3000 }).then(freePort => {
 // app.listen(freePort, () => {
   // console.log(`Server running on http://localhost:${freePort}`);
//  });
//});







//201 for successful creation.

//200 for general success (e.g., fetching data).

//400 for bad requests.

//500 for internal server errors.



