// Base URL of your API
const API_BASE_URL = 'http://localhost: 3000';

// Function to fetch data from the server and display it
async function fetchData(route) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${route}`);
    const data = await response.json();
    displayData(route, data);
  } catch (error) {
    alert(`Failed to fetch data: ${error.message}`);
  }
}

// Function to add data to the server
async function addData(route, payload, resultDivID) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.text();
    document.getElementById(resultDivID).innerHTML = `<p>${result}</p>`;
  } catch (error) {
    alert(`Failed to add data: ${error.message}`);
  }
}

// === Display Data Function ===
function displayData(route, data) {
  const resultDiv = document.getElementById(`${route.split('-')[1]}s-results`);
  if (data.length === 0) {
    resultDiv.innerHTML = `<p>No data found for ${route.split('-')[1]}s.</p>`;
  } else {
    resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}




// Function to modify existing data by its primary key
async function modifyData(route, payload, resultDivID) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${route}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.text();
    document.getElementById(resultDivID).innerHTML = `<p>${result}</p>`;
  } catch (error) {
    alert(`Failed to modify data: ${error.message}`);
  }
}

// Function to delete data by its primary key
async function deleteData(route,payload, resultDivID) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${route}`, {
      method: 'DELETE',
    });
    const result = await response.text();
    document.getElementById(resultDivID).innerHTML = `<p>${result}</p>`;
  } catch (error) {
    alert(`Failed to delete data: ${error.message}`);
  }
}


// === Student Form Submission ===
document.getElementById('add-student-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('studentID').value,
    name: document.getElementById('studentName').value,
    departmentID: document.getElementById('studentDepartmentID').value,
    level: document.getElementById('studentLevel').value,
  };
  addData('add-student', payload, 'students-results');
});

document.getElementById('modify-student-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('modifyStudentID').value,
    name: document.getElementById('modifyStudentName').value,
    departmentID: document.getElementById('modifyStudentDepartmentID').value,
    level: document.getElementById('modifyStudentLevel').value,
  };
  modifyData('modify-student', payload, 'students-results');
});

document.getElementById('delete-student-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = document.getElementById('deleteStudentID').value;
  deleteData('delete-student', payload, 'students-results');
});

// === Teacher Form Submission ===
document.getElementById('add-teacher-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    teacherID: document.getElementById('teacherID').value,
    name: document.getElementById('teacherName').value,
    departmentID: document.getElementById('teacherDepartmentID').value,
  };
  addData('add-teacher', payload, 'teachers-results');
});

document.getElementById('modify-teacher-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    teacherID: document.getElementById('modifyTeacherID').value,
    name: document.getElementById('modifyTeacherName').value,
    departmentID: document.getElementById('modifyTeacherDepartmentID').value,
  };
  modifyData('modify-teacher', payload, 'teachers-results');
});

document.getElementById('delete-teacher-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = document.getElementById('deleteTeacherID').value;
  deleteData('delete-teacher',payload, 'teachers-results');
});

// === Course Form Submission ===
document.getElementById('add-course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    courseID: document.getElementById('courseID').value,
    courseName: document.getElementById('courseName').value,
    departmentID: document.getElementById('courseDepartmentID').value,
    credits: document.getElementById('courseCredits').value,
  };
  addData('add-course', payload, 'courses-results');
});

document.getElementById('modify-course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    courseID: document.getElementById('modifyCourseID').value,
    courseName: document.getElementById('modifyCourseName').value,
    departmentID: document.getElementById('modifyCourseDepartmentID').value,
    credits: document.getElementById('modifyCourseCredits').value,
  };
  modifyData('modify-course', payload, 'courses-results');
});

document.getElementById('delete-course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = document.getElementById('deleteCourseID').value;
  deleteData('delete-course',payload, 'courses-results');
});

// === Enrollment Form Submission ===
document.getElementById('add-enrollment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('enrollmentStudentID').value,
    courseID: document.getElementById('enrollmentCourseID').value,
    semester: document.getElementById('enrollmentSemester').value,
  };
  addData('add-enrollment', payload, 'enrollments-results');
});

document.getElementById('modify-enrollment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('modifyEnrollmentStudentID').value,
    courseID: document.getElementById('modifyEnrollmentCourseID').value,
    semester: document.getElementById('modifyEnrollmentSemester').value,
  };
  modifyData('modify-enrollment', payload, 'enrollments-results');
});

document.getElementById('delete-enrollment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload={ 
    studentID : document.getElementById('deleteEnrollmentStudentID').value,
    courseID : document.getElementById('deleteEnrollmentCourseID').value
  };
  deleteData('delete-enrollment',payload, 'enrollments-results');
});

// === Grade Form Submission ===
document.getElementById('assign-grade-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('gradeStudentID').value,
    courseID: document.getElementById('gradeCourseID').value,
    grade: document.getElementById('gradeValue').value,
  };
  addData('assign-grade', payload, 'grades-results');
});

document.getElementById('modify-grade-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID: document.getElementById('modifyGradeStudentID').value,
    courseID: document.getElementById('modifyGradeCourseID').value,
    grade: document.getElementById('modifyGradeValue').value,
  };
  modifyData('modify-grade', payload, 'grades-results');
});

document.getElementById('delete-grade-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    studentID : document.getElementById('deleteGradeStudentID').value,
    courseID : document.getElementById('deleteGradeCourseID').value
  };
  deleteData('delete-grade',payload, 'grades-results');
});

// === Schedule Form Submission ===
document.getElementById('add-schedule-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    courseID: document.getElementById('scheduleCourseID').value,
    teacherID: document.getElementById('scheduleTeacherID').value,
    day: document.getElementById('scheduleDay').value,
    time: document.getElementById('scheduleTime').value,
    room: document.getElementById('scheduleRoom').value,
  };
  addData('add-schedule', payload, 'schedules-results');
});

document.getElementById('modify-schedule-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    courseID: document.getElementById('modifyScheduleCourseID').value,
    teacherID: document.getElementById('modifyScheduleTeacherID').value,
    day: document.getElementById('modifyScheduleDay').value,
    time: document.getElementById('modifyScheduleTime').value,
    room: document.getElementById('modifyScheduleRoom').value,
  };
  modifyData('modify-schedule', payload, 'schedules-results');
});

document.getElementById('delete-schedule-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
   teacherID: document.getElementById('deleteScheduleTeacherID').value,
   courseID: document.getElementById('deleteScheduleCourseID').value
  };
   
    
  deleteData('delete-schedule', payload, 'schedules-results');
});

// === Faculty Form Submission ===
document.getElementById('add-faculty-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    facultyID: document.getElementById('facultyID').value,
    facultyName: document.getElementById('facultyName').value,
  };
  addData('add-faculty', payload, 'faculties-results');
});

document.getElementById('modify-faculty-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    facultyID: document.getElementById('modifyFacultyID').value,
    facultyName: document.getElementById('modifyFacultyName').value,
  };
  modifyData('modify-faculty', payload, 'faculties-results');
});

document.getElementById('delete-faculty-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = document.getElementById('deleteFacultyID').value;
  deleteData('delete-faculty', payload, 'faculties-results');
});

// === Department Form Submission ===
document.getElementById('add-department-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    departmentID: document.getElementById('departmentID').value,
    departmentName: document.getElementById('departmentName').value,
    facultyID: document.getElementById('departmentFacultyID').value,
  };
  addData('add-department', payload, 'departments-results');
});

document.getElementById('modify-department-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    departmentID: document.getElementById('modifyDepartmentID').value,
    departmentName: document.getElementById('modifyDepartmentName').value,
    facultyID: document.getElementById('modifyDepartmentFacultyID').value,
  };
  modifyData('modify-department', payload, 'departments-results');
});

document.getElementById('delete-department-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = document.getElementById('deleteDepartmentID').value;
  deleteData('delete-department',payload, 'departments-results');
});

// === Optional Display Function for All Entities ===
async function displayAllEntities() {
  try {
    await fetchData('students');
    await fetchData('teachers');
    await fetchData('courses');
    await fetchData('enrollments');
    await fetchData('grades');
    await fetchData('schedules');
    await fetchData('faculties');
    await fetchData('departments');
  } catch (error) {
    alert(`Failed to fetch all entities: ${error.message}`);
  }
}

// Event listener for displaying all entities when the user clicks the button
document.getElementById('display-all-btn').addEventListener('click', displayAllEntities);







//async function fetchData(route) {
  //try {
   // const response = await fetch(`${API_BASE_URL}/${route}`);
 //   const data = await response.json();
   // displayData(route, data);
//  } catch (error) {
  //  alert(`Failed to fetch data: ${error.message}`);
 // }
//}