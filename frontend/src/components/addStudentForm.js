import { useState } from "react";

const AddStudentForm = ({
  setName,
  setYear,
  setMajor,
  name,
  year,
  major,
  studentDispatch,
}) => {
  const [error, setError] = useState(null);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const newStudent = { name, major, year };

    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    console.log(json);
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setMajor("");
      setYear("");
      setError(null);
      console.log(json, "new student created");
      studentDispatch({ type: "CREATE_STUDENT", payload: json });
    }
  };
  return (
    <div className="form">
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          value={name}
        />
        <input
          type="text"
          onChange={(e) => {
            setYear(e.target.value);
          }}
          placeholder="Birth Year"
          value={year}
        />
        <input
          type="text"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
          placeholder="Major"
          value={major}
        />

        <button>Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
