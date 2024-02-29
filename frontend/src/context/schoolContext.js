import { createContext, useReducer } from "react";

export const SchoolContext = createContext();

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
      const { studentId, courseId } = action.payload;
      const updatedStdCoursesArray = studentState.students.map((student) =>
        student._id === studentId
          ? { ...student, courses: [...student.courses, courseId] }
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

export const SchoolContextProvider = ({ children }) => {
  const [courseState, courseDispatch] = useReducer(coursesReducer, {
    allCourses: null,
  });
  const [studentState, studentDispatch] = useReducer(studentsReducer, {
    students: null,
  });

  return (
    <SchoolContext.Provider
      value={{ courseState, courseDispatch, studentState, studentDispatch }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
