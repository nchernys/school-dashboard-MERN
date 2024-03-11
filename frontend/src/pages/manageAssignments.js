import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStudentsContextHook } from "../context/hooks/useContextHook";
import { useCoursesContextHook } from "../context/hooks/useContextHook";
import { useAssignmentsContextHook } from "../context/hooks/useContextHook";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";
import AddAssignmentToCourse from "../components/popupAddAssignmentToCourse";
import LoginPage from "./loginPage";

const ManageAssignments = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const { students, studentDispatch } = useStudentsContextHook();
  const { allCourses, courseDispatch } = useCoursesContextHook();
  const { assignments, assignmentDispatch } = useAssignmentsContextHook();
  const [selectCourse, setSelectCourse] = useState("");
  const [studentsPerCourse, setStudentsPerCourse] = useState([]);
  const [thisCourseGrades, setThisCourseGrades] = useState([]);
  const [collectAssignments, setCollectAssignments] = useState([]);
  const [editableCell, setEditableCell] = useState("false");
  const [averageGrades, setAverageGrades] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        courseDispatch({ type: "SET_COURSES", payload: json });
      } else {
        console.error(json);
      }
    };
    fetchCourses();

    const fetchAssignments = async () => {
      const response = await fetch("/api/assignments");
      const json = await response.json();

      if (response.ok) {
        assignmentDispatch({ type: "SET_ASSIGNMENTS", payload: json });
      } else {
        console.error(json);
      }
    };
    fetchAssignments();
  }, [courseDispatch, studentDispatch, assignmentDispatch]);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }

    return data;
  };

  const handleSelectCourse = async (courseId) => {
    try {
      const courseUrl = `/api/courses/${courseId}`;
      const studentsUrl = `/api/students/`;
      const assignmentsUrl = "/api/assignments";
      const gradesUrl = "/api/grades";

      const [course, students, assignments, grades] = await Promise.all([
        fetchData(courseUrl),
        fetchData(studentsUrl),
        fetchData(assignmentsUrl),
        fetchData(gradesUrl),
      ]);

      setSelectCourse(course);

      const studentsInThisCourse = students.filter((student) =>
        student.courses.some((course) => course._id === courseId)
      );
      setStudentsPerCourse(studentsInThisCourse);

      const findAssignments = assignments.filter(
        (assignment) => assignment.course === course._id
      );
      setCollectAssignments(findAssignments);

      const assignmentIdsInCourse = findAssignments.map(
        (assignment) => assignment._id
      );
      const collectCourseGrades = grades.filter((grade) =>
        assignmentIdsInCourse.includes(grade.assignment)
      );
      setThisCourseGrades(collectCourseGrades);
    } catch (error) {
      console.error("Error in handleSelectCourse:", error);
    }
  };

  useEffect(() => {
    if (selectCourse) {
      handleCalculateAverage(selectCourse);
    }
  }, [selectCourse]);

  const handleEditGrades = () => {
    setEditableCell(true);
  };

  const handleEditGradeScore = async (student, assignment, score) => {
    const resGrades = await fetch(`/api/grades`);
    const jsonGrades = await resGrades.json();
    const thisGrade = jsonGrades.filter(
      (grade) => grade.student === student && grade.assignment === assignment
    );
    if (thisGrade.length <= 0 && score !== "") {
      const newGrade = { assignment, student, score };
      const resGradeThis = await fetch(`/api/grades/`, {
        method: "POST",
        body: JSON.stringify(newGrade),
        headers: { "Content-Type": "application/json" },
      });

      const jsonGradeThis = await resGradeThis.json();

      if (!resGradeThis.ok) {
        console.log(jsonGradeThis.error);
      } else {
        console.log(jsonGradeThis, "new grade created");
      }
    } else if (thisGrade.length > 0 && score !== "") {
      const resGradeThis = await fetch(`/api/grades/${thisGrade[0]._id}`, {
        method: "PATCH",
        body: JSON.stringify({ score: score }),
        headers: { "Content-Type": "application/json" },
      });

      if (!resGradeThis.ok) {
        console.log("Error updating the grade");
      } else {
        console.log("The grade was updated");
      }
    }

    handleCalculateAverage();
  };

  const handleCalculateAverage = async () => {
    const gradesUrl = "/api/grades";
    const assignmentsUrl = "/api/assignments";
    const [grades, assignments] = await Promise.all([
      fetchData(gradesUrl),
      fetchData(assignmentsUrl),
    ]);

    const assignmentIdsInCourse = assignments
      .filter((assignment) => assignment.course === selectCourse._id)
      .map((assignment) => assignment._id);

    const collectCourseGrades = grades.filter((grade) =>
      assignmentIdsInCourse.includes(grade.assignment)
    );

    const calculateAverageGrades = [];
    studentsPerCourse.forEach((student) => {
      const allStudentScoresAllAssignments = collectCourseGrades
        .filter((grade) => grade.student === student._id)
        .map((grade) =>
          parseFloat(grade.score) ? parseFloat(grade.score) : 0
        );
      let avgGrade = 0;
      if (allStudentScoresAllAssignments.length === 0) {
        avgGrade = 0;
      } else {
        avgGrade = (
          allStudentScoresAllAssignments.reduce((acc, curr) => acc + curr, 0) /
          allStudentScoresAllAssignments.length
        ).toFixed(2);
      }
      calculateAverageGrades.push({ student, avgGrade });
    });
    setAverageGrades(calculateAverageGrades);
  };

  return (
    <>
      {!authorize && <Navigate to="/user-login" />}
      <div className="container grades">
        <h2>Select course: </h2>
        <div className="delete-form-page">
          <select onChange={(e) => handleSelectCourse(e.target.value)}>
            <option>Select course:</option>
            {allCourses &&
              allCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
          </select>
        </div>
        {selectCourse && (
          <div>
            <AddAssignmentToCourse
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              selectCourse={selectCourse}
              collectAssignments={collectAssignments}
              assignmentDispatch={assignmentDispatch}
              handleSelectCourse={handleSelectCourse}
            />
            <h2>{selectCourse && selectCourse.title}</h2>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    <td>STUDENTS & ASSIGNMENTS</td>
                    {collectAssignments &&
                      collectAssignments.map((assignment) => (
                        <td key={assignment._id}>{assignment.title}</td>
                      ))}
                    <td>AVG SCORE</td>
                  </tr>
                </thead>
                <tbody>
                  {studentsPerCourse &&
                    studentsPerCourse.map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        {collectAssignments.map((assignment) => (
                          <td
                            onClick={() =>
                              handleEditGrades(student._id, assignment._id)
                            }
                            onBlur={(e) =>
                              handleEditGradeScore(
                                student._id,
                                assignment._id,
                                e.currentTarget.textContent
                              )
                            }
                            key={`${student._id}-${assignment._id}`}
                            contentEditable={editableCell ? "true" : "false"}
                          >
                            {thisCourseGrades.find(
                              (grade) =>
                                grade.student === student._id &&
                                grade.assignment === assignment._id
                            )?.score || ""}
                          </td>
                        ))}
                        <td>
                          {averageGrades &&
                            averageGrades
                              .filter((avg) => avg.student._id === student._id)
                              .map((avg) => avg.avgGrade)}
                          %
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageAssignments;
