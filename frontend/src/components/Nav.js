import { Link } from "react-router-dom";
const Nav = () => {
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
    </div>
  );
};

export default Nav;
