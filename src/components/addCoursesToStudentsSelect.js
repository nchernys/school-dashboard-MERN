const AddCoursesToStudentsSelect = () => {
  return (
    <div className="dropdown">
      <select
        name="courseDropDown"
        id="courseDropDown"
        onChange={handleDropdownChange}
        value={courseSelected}
      >
        <option>Choose a course:</option>
        {courses &&
          courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
      </select>
    </div>
  );
};
