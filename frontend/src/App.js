import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import AddCoursesToStudents from "./pages/addCoursesToStudents";
import ManageCourses from "./pages/manageCourses";
import ManageCourseAssignments from "./pages/manageCourseAssignments";

function MainApp() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses-add-remove"
              element={<AddCoursesToStudents />}
            />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route
              path="/manage-assignments"
              element={<ManageCourseAssignments />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default MainApp;
