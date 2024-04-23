import { Link } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useEffect } from "react";

const Nav = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      authorizeDispatch({ type: "SET_AUTH", payload: true });
    }
  }, [authorizeDispatch, authorize]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    authorizeDispatch({ type: "REMOVE_AUTH", payload: false });
  };

  return (
    <div className="nav">
      <div className="nav-left">
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
          <p>Gradebook (Log-in) </p>
        </Link>
        <Link to="/">
          <p onClick={handleLogout}>Logout</p>
        </Link>
      </div>
      <div className="nav-right">
        <a href="https://nchernysheva.com">WebDev</a>
      </div>
    </div>
  );
};

export default Nav;
