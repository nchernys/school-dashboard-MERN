import { createContext, useReducer } from "react";

export const SchoolContext = createContext();

export const authorizeReducer = (authorizeState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        authorize: true,
      };
    case "REMOVE_AUTH":
      return {
        authorize: false,
      };

    default:
      return authorizeState;
  }
};

export const globalRoleReducer = (globalRoleState, action) => {
  switch (action.type) {
    case "CREATE_ROLE":
      const createGlobalRole = action.payload;
      return {
        globalRole: createGlobalRole,
      };

    case "SET_ROLE":
      return {
        ...globalRoleState,
        globalRole: action.payload,
      };

    default:
      return globalRoleState;
  }
};

export const coursesReducer = (courseState, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        ...courseState,
        allCourses: action.payload,
      };
    case "CREATE_COURSE":
      const newCourse = action.payload;
      const sortedCourses = [...courseState.allCourses, newCourse].sort(
        (a, b) => a.title.localeCompare(b.title)
      );
      return {
        ...courseState,
        allCourses: sortedCourses,
      };

    case "DELETE_COURSE":
      const courseIdToDelete = action.payload;
      const updatedCourses = courseState.allCourses.filter(
        (course) => course._id !== courseIdToDelete._id
      );
      return {
        ...courseState,
        allCourses: updatedCourses,
      };
    default:
      return courseState;
  }
};

export const studentsReducer = (studentState, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...studentState,
        students: action.payload,
      };

    case "CREATE_STUDENT":
      const newStudent = action.payload;
      const sortedStudents = [...studentState.students, newStudent].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      return {
        ...studentState,
        students: sortedStudents,
      };

    case "DELETE_STUDENT":
      const studentIdToDelete = action.payload;
      const updatedStudents = studentState.students.filter(
        (student) => student._id !== studentIdToDelete._id
      );
      return {
        ...studentState,
        students: updatedStudents,
      };

    case "UPDATE_STUDENT":
      const updatedStudent = action.payload;
      const updatedStudentsArray = studentState.students.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      );
      return {
        ...studentState,
        students: updatedStudentsArray,
      };

    case "ADD_COURSE_STUDENT":
      const { studentId, course } = action.payload;
      const updatedStdCoursesArray = studentState.students.map((student) =>
        student._id === studentId
          ? {
              ...student,
              courses: student.courses.some(
                (existingCourse) => existingCourse._id === course._id
              )
                ? [...student.courses]
                : [...student.courses, course],
            }
          : student
      );
      return {
        ...studentState,
        students: updatedStdCoursesArray,
      };

    case "DROP_COURSE_STUDENT":
      const { studentIdDrop, courseIdDrop } = action.payload;
      const updatedStdCoursesArrayDrop = studentState.students.map((student) =>
        student._id === studentIdDrop
          ? {
              ...student,
              courses: student.courses.filter(
                (course) => course._id !== courseIdDrop
              ),
            }
          : student
      );

      return {
        ...studentState,
        students: updatedStdCoursesArrayDrop,
      };

    default:
      return studentState;
  }
};

export const assignmentsReducer = (assignmentState, action) => {
  switch (action.type) {
    case "SET_ASSIGNMENTS":
      return {
        ...assignmentState,
        assignments: action.payload,
      };

    case "CREATE_ASSIGNMENT":
      const newAssignment = action.payload;
      const sortedAssignments = [
        ...assignmentState.assignments,
        newAssignment,
      ].sort((a, b) => a.title.localeCompare(b.title));

      console.log("GOT NEW ASSIGNMENT!");

      return {
        ...assignmentState,
        assignments: sortedAssignments,
      };

    case "DELETE_ASSIGNMENT":
      const assignmentToDelete = action.payload;
      const updatedAssignments = assignmentState.assignments.filter(
        (assignment) => assignment._id !== assignmentToDelete
      );
      return {
        ...assignmentState,
        assignments: updatedAssignments,
      };

    default:
      return assignmentState;
  }
};

export const SchoolContextProvider = ({ children }) => {
  const [courseState, courseDispatch] = useReducer(coursesReducer, {
    allCourses: null,
  });
  const [studentState, studentDispatch] = useReducer(studentsReducer, {
    students: null,
  });
  const [assignmentState, assignmentDispatch] = useReducer(assignmentsReducer, {
    assignments: null,
  });
  const [authorizeState, authorizeDispatch] = useReducer(authorizeReducer, {
    authorize: null,
  });

  const [globalRoleState, globalRoleDispatch] = useReducer(globalRoleReducer, {
    globalRole: null,
  });

  return (
    <SchoolContext.Provider
      value={{
        courseState,
        courseDispatch,
        studentState,
        studentDispatch,
        assignmentState,
        assignmentDispatch,
        authorizeState,
        authorizeDispatch,
        globalRoleState,
        globalRoleDispatch,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
