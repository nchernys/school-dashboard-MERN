import { Link } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";

const Nav = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();

  const handleLogout = () => {
    localStorage.removeItem("token");
    authorizeDispatch({ type: "REMOVE_AUTH", payload: false });
  };

  return (
    <div className="nav">
      <Link to="/">
        <p>Manage Students</p>
      </Link>
      <Link to="/manage-courses">
        <p>Manage Courses</p>
      </Link>
      <Link to="/courses-add-remove">
        <p>Enroll</p>
      </Link>
      <Link to="/manage-assignments">
        <p>Gradebook</p>
      </Link>
      <Link to="/">
        <p onClick={handleLogout}>Logout</p>
      </Link>
    </div>
  );
};

export default Nav;
