import { useEffect, useState } from "react";

const PopupUpdateStudent = ({
  students,
  studentDispatch,
  showPopup,
  setShowPopup,
  handlePopupHide,
  studentToUpdate,
  setStudentToUpdate,
  setName,
  setYear,
  setMajor,
  name,
  year,
  major,
}) => {
  useEffect(() => {
    setName(studentToUpdate.name);
    setYear(studentToUpdate.year);
    setMajor(studentToUpdate.major);
  }, [studentToUpdate]);

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const updatedStudent = { name, year, major };
    const response = await fetch(`api/students/${studentToUpdate._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    } else {
      studentDispatch({ type: "UPDATE_STUDENT", payload: json });
    }
    setShowPopup(false);
  };

  return (
    <div className="popup" style={{ display: showPopup ? "flex" : "none" }}>
      <div className="close" onClick={handlePopupHide}>
        close
      </div>
      <h2>{studentToUpdate.name}:</h2>
      <form className="update-form" onSubmit={handleUpdateStudent}>
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

        <button>Update Student</button>
      </form>
    </div>
  );
};

export default PopupUpdateStudent;
