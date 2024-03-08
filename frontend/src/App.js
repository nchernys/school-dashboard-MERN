import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import ManageStudents from "./pages/manageStudents";
import ManageCourses from "./pages/manageCourses";
import ManageAssignments from "./pages/manageAssignments";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import { useAuthorizeContextHook } from "./context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "./context/hooks/useContextHook";

function MainApp() {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const { globalRole, globalRoleDispatch } = useGlobalRoleContextHook();

  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses-add-remove" element={<ManageStudents />} />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/manage-assignments" element={<ManageAssignments />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default MainApp;
