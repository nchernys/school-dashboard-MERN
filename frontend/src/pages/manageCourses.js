import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCoursesContextHook } from "../context/hooks/useContextHook";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";
import LoginPage from "./loginPage";

const ManageCourses = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const { allCourses, courseDispatch } = useCoursesContextHook();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("/api/departments");
      const json = await response.json();

      if (response.ok) {
        setAllDepartments(json);
      } else {
        console.error("Error fetching departments:", json.error);
      }

      console.log(json);
    };

    fetchDepartments();

    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        courseDispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, []);

  const addCourseToDb = async (e) => {
    e.preventDefault();
    const newCourse = { title, description, department };
    console.log(newCourse);

    const response = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(newCourse),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setDepartment("");
      setError(null);
      console.log("Course was created.");
      courseDispatch({ type: "CREATE_COURSE", payload: json });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json, "was deleted successfully");
      courseDispatch({ type: "DELETE_COURSE", payload: json });
    }

    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Add Courses</h2>
        <div className="form">
          <form onSubmit={addCourseToDb}>
            <input
              type="text"
              placeholder="Course title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Course description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <select
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            >
              <option>Select the department</option>
              {allDepartments &&
                allDepartments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.title}
                  </option>
                ))}
            </select>
            <button>Submit</button>
          </form>
        </div>
        <h2>Courses</h2>
        <table>
          <thead>
            <tr>
              <td>Course</td>
              <td>Course Description</td>
              <td>Department</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {allCourses &&
              allCourses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.department.title}</td>
                  <td
                    className="deleteCourse"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Remove
                  </td>
                </tr>
              ))}
          </tbody>
        </table>{" "}
      </div>
    </>
  );
};

export default ManageCourses;
