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
    throw Error("useStudentContextHook must be used within its scope");
  }
  return { students: studentState.students, studentDispatch };
};

export const useAssignmentsContextHook = () => {
  const { assignmentState, assignmentDispatch } = useContext(SchoolContext);

  if (!assignmentState || !assignmentDispatch) {
    throw Error("useAssignmentContextHook must be used within its scope");
  }
  return { assignments: assignmentState.assignments, assignmentDispatch };
};

export const useAuthorizeContextHook = () => {
  const { authorizeState, authorizeDispatch } = useContext(SchoolContext);

  if (!authorizeState || !authorizeDispatch) {
    throw Error("useAuthorizeContextHook must be used within its scope");
  }
  return { authorize: authorizeState.authorize, authorizeDispatch };
};

export const useGlobalRoleContextHook = () => {
  const { globalRoleState, globalRoleDispatch } = useContext(SchoolContext);

  if (!globalRoleState || !globalRoleDispatch) {
    throw Error("useGlobalRoleContextHook must be used within its scope");
  }
  return { globalRole: globalRoleState.globalRole, globalRoleDispatch };
};
