import { SchoolContext } from "../schoolContext";
import { useContext } from "react";

export const useCoursesContextHook = () => {
  const { courseState, courseDispatch } = useContext(SchoolContext);

  if (!courseState || !courseDispatch) {
    throw Error("useCoursesContextHook must be used within its scope");
  }
  return { allCourses: courseState.allCourses, courseDispatch };
};

export const useStudentsContextHook = () => {
  const { studentState, studentDispatch } = useContext(SchoolContext);

  if (!studentState || !studentDispatch) {
    throw Error("useCoursesContextHook must be used within its scope");
  }
  return { students: studentState.students, studentDispatch };
};
