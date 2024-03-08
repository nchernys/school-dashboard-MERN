const PopupAddCourseToStudent = ({
  showAdd,
  allCourses,
  thisStudent,
  setCourseToViewAddDelete,
  setShowAdd,
  setError,
  handlePopupHide,
  studentDispatch,
}) => {
  const handleLinkCourseToStudent = async (courseId) => {
    setCourseToViewAddDelete(courseId);
    const studentId = thisStudent._id;
    const studentCourse = { courseId };

    const response = await fetch(`/api/students/addcourse/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify(studentCourse),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError("THIS IS ERROR", json.error);
    } else {
      setError(null);
      setShowAdd(false);
      const course = allCourses.find((course) => course._id === courseId);
      studentDispatch({
        type: "ADD_COURSE_STUDENT",
        payload: { studentId, course },
      });
    }
  };

  return (
    <div className="popup" style={{ display: showAdd ? "flex" : "none" }}>
      <div className="close" onClick={handlePopupHide}>
        close
      </div>
      <h2>{thisStudent.name}:</h2>
      <select
        name="courses"
        id="courses"
        onChange={(e) => handleLinkCourseToStudent(e.target.value)}
      >
        <option>Add a course:</option>
        {allCourses &&
          allCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
      </select>
    </div>
  );
};

export default PopupAddCourseToStudent;
