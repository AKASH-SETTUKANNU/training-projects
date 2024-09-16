document.addEventListener('DOMContentLoaded', () => {
    const studentName = document.getElementById('student-name');
    const studentGrade = document.getElementById('student-grade');
    const gradeList = document.getElementById('garde-order-list');
    const averageGradeElement = document.getElementById('average-grade');
    let students = [];

    addStudent = function () {
        const studentData = {
            name: studentName.value,
            grade: parseFloat(studentGrade.value)
        };
        students.push(studentData);
        document.getElementById("grade-success-area").innerHTML = "Student added successfully...!";
        studentName.value = '';
        studentGrade.value = '';
    }
    clearSuccess = function () {
        document.getElementById("grade-success-area").innerHTML = "";
    }
    displayGrades = function () {
        gradeList.innerHTML = '';
        students.forEach((student) => {
            const studentListItem = document.createElement('li');
            studentListItem.classList.add('studentlist');
            studentListItem.innerHTML = `<p>${student.name} - ${student.grade}</p>`;
            gradeList.appendChild(studentListItem);
        });
    }

    averageGrade = function () {
        if (students.length === 0) {
            averageGradeElement.innerHTML = 'Average Grade: No students available';
            return;
        }

        let totalGrade = 0;
        let count = students.length;

        students.forEach((student) => {
            totalGrade += student.grade;
        });

        const averageGrades = totalGrade / count;
        averageGradeElement.innerHTML = `Average Grade: ${averageGrades.toFixed(2)}`;
    }
});
