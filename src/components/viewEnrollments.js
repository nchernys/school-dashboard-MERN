const PopViewEnrollments = ({
  allCourses,
  students,
  viewEnrollments,
  setViewEnrollments,
  handlePopupHide,
  setCourseToViewAddDelete,
  courseToViewAddDelete,
}) => {
  let enrolledStudents = [];
  let courseEnrolled;
  if (students) {
    enrolledStudents = students.filter((student) =>
      student.courses.some((course) => course._id === courseToViewAddDelete)
    );
  }

  if (allCourses) {
    courseEnrolled = allCourses.find(
      (course) => course._id === courseToViewAddDelete
    );
  }

  return (
    <div
      className="popup"
      style={{ display: viewEnrollments ? "flex" : "none" }}
    >
      <div className="close" onClick={handlePopupHide}>
        close
      </div>
      <h2>{courseEnrolled && courseEnrolled.title}:</h2>
      <hr />
      {enrolledStudents &&
        enrolledStudents.map((student) => (
          <div key={student._id}>{student.name}</div>
        ))}
    </div>
  );
};

export default PopViewEnrollments;
