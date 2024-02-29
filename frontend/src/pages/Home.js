import { useEffect, useState } from "react";
import AddStudentForm from "../components/addStudentForm";
import PopupUpdateStudent from "../components/popupUpdateStudent";
import { useStudentsContextHook } from "../context/hooks/useContextHook";

const Home = () => {
  const { students, studentDispatch } = useStudentsContextHook();
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [thisStudentId, setThisStudentId] = useState("");
  const [studentToUpdate, setStudentToUpdate] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const json = await response.json();

      if (response.ok) {
        studentDispatch({ type: "SET_STUDENTS", payload: json });
      }
    };

    fetchStudents();
  }, [students]);

  const handleDeleteStudent = async (studentId) => {
    setThisStudentId(studentId);
    const response = await fetch(`/api/students/${studentId}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      studentDispatch({ type: "DELETE_STUDENT", payload: json });
    } else {
      console.error("Error fetching departments:", json.error);
    }

    console.log(json);
  };

  const handleUpdateStudent = async (studentId) => {
    setShowPopup(true);
    const studentToUpdate = students.find(
      (student) => student._id === studentId
    );
    setStudentToUpdate(studentToUpdate);
  };

  const handlePopupHide = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="container">
        <h2>Students</h2>
        <div className="forms">
          <AddStudentForm
            studentDispatch={studentDispatch}
            setName={setName}
            setYear={setYear}
            setMajor={setMajor}
            name={name}
            year={year}
            major={major}
          />
        </div>
        <table>
          <PopupUpdateStudent
            students={students}
            studentDispatch={studentDispatch}
            handlePopupHide={handlePopupHide}
            studentToUpdate={studentToUpdate}
            setStudentToUpdate={setStudentToUpdate}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setName={setName}
            setYear={setYear}
            setMajor={setMajor}
            name={name}
            year={year}
            major={major}
          />
          <thead>
            <tr>
              <td>Name</td>
              <td>Major</td>
              <td>Courses</td>
              <td>Update</td>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td> <td> {student.major} </td>
                  <td>
                    {" "}
                    {student.courses.map((course) => (
                      <div key={course._id}> {course.title} </div>
                    ))}
                  </td>
                  <td>
                    <span
                      className="update-student"
                      onClick={() => handleUpdateStudent(student._id)}
                    >
                      Update{" "}
                    </span>{" "}
                    |
                    <span
                      className="delete-student"
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      {" "}
                      Delete{" "}
                    </span>{" "}
                    <br />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
