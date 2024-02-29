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
    const studentCourse = { studentId: thisStudent._id, courseId };

    const response = await fetch(`/api/students/addcourse/${thisStudent._id}`, {
      method: "PATCH",
      body: JSON.stringify(studentCourse),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setShowAdd(false);
      console.log(json, "the course is added to student created");

      studentDispatch({ type: "ADD_COURSE_STUDENT", payload: json });
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
        <option>Delete a course:</option>
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
