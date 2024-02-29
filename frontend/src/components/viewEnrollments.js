const PopViewEnrollments = ({
  allCourses,
  students,
  viewEnrollments,
  setViewEnrollments,
  handlePopupHide,
  setCourseToViewAddDelete,
  courseToViewAddDelete,
}) => {
  const enrolledStudents = students.filter((student) =>
    student.courses.some((course) => course._id === courseToViewAddDelete)
  );

  const courseEnrolled = allCourses.find(
    (course) => course._id === courseToViewAddDelete
  );

  return (
    <div
      className="popup"
      style={{ display: viewEnrollments ? "flex" : "none" }}
    >
      <div className="close" onClick={handlePopupHide}>
        close
      </div>
      <h2>{courseEnrolled.title}:</h2>
      <hr />
      {enrolledStudents &&
        enrolledStudents.map((student) => <div>{student.name}</div>)}
    </div>
  );
};

export default PopViewEnrollments;
