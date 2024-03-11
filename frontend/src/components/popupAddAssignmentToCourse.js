import { useEffect, useState } from "react";

const AddAssignmentToCourse = ({
  title,
  setTitle,
  description,
  setDescription,
  selectCourse,
  assignmentDispatch,
  collectAssignments,
  handleSelectCourse,
}) => {
  const [saveAssignmentId, setSaveAssignmentId] = useState("");

  const handleAddNewAssignment = async (e) => {
    e.preventDefault();
    const course = selectCourse;
    const newAssignment = { title, description, course };

    const response = await fetch("/api/assignments", {
      method: "POST",
      body: JSON.stringify(newAssignment),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    console.log(json);
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      assignmentDispatch({ type: "CREATE_ASSIGNMENT", payload: json });
    }
    handleSelectCourse(course._id);
  };

  const handleSelectAssignment = (assignmentId) => {
    setSaveAssignmentId(assignmentId);
  };

  const handleDeleteAssignment = async (e) => {
    e.preventDefault();
    const assignmentId = saveAssignmentId;
    console.log("DELETE THIS COURSE", saveAssignmentId);
    const response = await fetch(`/api/assignments/${assignmentId}`, {
      method: "DELETE",
    });

    const json = await response.json();

    console.log(json);
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      assignmentDispatch({ type: "DELETE_ASSIGNMENT", payload: json });
    }
    handleSelectCourse(selectCourse._id);
  };

  return (
    <>
      <div className="form assignments">
        <h2>Add an Assignment</h2>
        <form onSubmit={(e) => handleAddNewAssignment(e)}>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            value={title}
          />
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Description"
            value={description}
          />
          <button>Add</button>
        </form>
      </div>
      <h2>Delete an Assignment </h2>
      <form
        className="delete-form-page"
        onSubmit={(e) => {
          handleDeleteAssignment(e);
        }}
      >
        <select onChange={(e) => handleSelectAssignment(e.target.value)}>
          {collectAssignments &&
            collectAssignments.map((assignment) => (
              <option key={assignment._id} value={assignment._id}>
                {assignment.title}
              </option>
            ))}
        </select>
        <button>Delete</button>
      </form>
    </>
  );
};

export default AddAssignmentToCourse;
