import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PopupAddCourseToStudent from "../components/popupAddCourseToStudent";
import PopupDeleteCourseFromStudent from "../components/popupDeleteCourseFromStudent";
import PopViewEnrollments from "../components/viewEnrollments";
import { useStudentsContextHook } from "../context/hooks/useContextHook";
import { useCoursesContextHook } from "../context/hooks/useContextHook";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";
import LoginPage from "./loginPage";

const ManageStudents = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const { students, studentDispatch } = useStudentsContextHook();
  const { allCourses, courseDispatch } = useCoursesContextHook();
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [thisStudent, setThisStudent] = useState("");
  const [courseToViewAddDelete, setCourseToViewAddDelete] = useState("");
  const [viewEnrollments, setViewEnrollments] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const json = await response.json();

      if (response.ok) {
        studentDispatch({ type: "SET_STUDENTS", payload: json });
      }
    };

    fetchStudents();

    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        courseDispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, [studentDispatch, courseDispatch]);

  const handleAddCourse = (studentId) => {
    setShowAdd(true);
    const student = students.find((student) => student._id === studentId);
    setThisStudent(student);
  };

  const handleDelCourse = (studentId) => {
    setShowDel(true);
    const student = students.find((student) => student._id === studentId);
    setThisStudent(student);
  };

  const handlePopupHide = () => {
    setShowAdd(false);
    setShowDel(false);
    setViewEnrollments(false);
  };

  const handleCourseEnrollments = (courseId) => {
    setViewEnrollments(true);
    setCourseToViewAddDelete(courseId);
  };

  let Num = 0;

  return (
    <>
      <div className="container">
        <h2>Enrollment</h2>
        <table>
          <thead>
            <tr>
              <td>No.</td>
              <td>Names</td>
              <td>Courses</td>
              <td>Add / Drop</td>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student) => {
                const curNum = ++Num;
                return (
                  <tr key={student._id}>
                    <td>{curNum}</td>
                    <td>{student.name}</td>
                    <td>
                      {student.courses.map((course) => (
                        <span
                          className="view-enrollments"
                          key={course._id}
                          onClick={() => handleCourseEnrollments(course._id)}
                        >
                          {" "}
                          {course.title} <br />{" "}
                        </span>
                      ))}
                    </td>
                    <td>
                      <span
                        className="addCourseBtn"
                        onClick={() => handleAddCourse(student._id)}
                      >
                        Add
                      </span>{" "}
                      |{" "}
                      <span
                        className="delCourseBtn"
                        onClick={() => handleDelCourse(student._id)}
                      >
                        Drop
                      </span>{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <PopupAddCourseToStudent
          setShowAdd={setShowAdd}
          showAdd={showAdd}
          allCourses={allCourses}
          thisStudent={thisStudent}
          setCourseToViewAddDelete={setCourseToViewAddDelete}
          setError={setError}
          setShowDel={setShowDel}
          handlePopupHide={handlePopupHide}
          studentDispatch={studentDispatch}
        />
        <PopupDeleteCourseFromStudent
          showDel={showDel}
          setShowDel={setShowDel}
          thisStudent={thisStudent}
          setError={setError}
          setCourseToViewAddDelete={setCourseToViewAddDelete}
          handlePopupHide={handlePopupHide}
          studentDispatch={studentDispatch}
        />
        <PopViewEnrollments
          students={students}
          allCourses={allCourses}
          viewEnrollments={viewEnrollments}
          setViewEnrollments={setViewEnrollments}
          handlePopupHide={handlePopupHide}
          setCourseToViewAddDelete={setCourseToViewAddDelete}
          courseToViewAddDelete={courseToViewAddDelete}
        />
      </div>
    </>
  );
};

export default ManageStudents;
