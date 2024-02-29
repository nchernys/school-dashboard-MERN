const PopupDeleteCourseFromStudent = ({
  showDel,
  setShowDel,
  thisStudent,
  setError,
  setCourseToViewAddDelete,
  handlePopupHide,
  studentDispatch,
}) => {
  const handleDeleteCourseFromStudent = async (courseId) => {
    setCourseToViewAddDelete(courseId);
    const studentCourse = { studentId: thisStudent._id, courseId };
    const response = await fetch(
      `/api/students/deletecourse/${thisStudent._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(studentCourse),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    console.log(json);
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setShowDel(false);
      console.log(json, "the course is added to student created");
      studentDispatch({ type: "DROP_COURSE_STUDENT", payload: json });
    }
  };

  return (
    <div className="popup" style={{ display: showDel ? "flex" : "none" }}>
      <div className="close" onClick={handlePopupHide}>
        close
      </div>
      <h2>{thisStudent.name}:</h2>
      {thisStudent.courses &&
        thisStudent.courses.map((course) => (
          <div
            className="clickRemoveCourse"
            key={course._id}
            onClick={(e) => handleDeleteCourseFromStudent(course._id)}
          >
            {course.title}
          </div>
        ))}
    </div>
  );
};

export default PopupDeleteCourseFromStudent;
