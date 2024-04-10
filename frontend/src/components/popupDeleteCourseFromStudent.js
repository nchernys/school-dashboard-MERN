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
    const studentId = thisStudent._id;

    const response = await fetch(`/api/students/deletecourse/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify({ courseId }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    console.log("JSON", json);

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setShowDel(false);
      studentDispatch({
        type: "DROP_COURSE_STUDENT",
        payload: { studentIdDrop: studentId, courseIdDrop: courseId },
      });
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
