import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <p>Students</p>
      </Link>
      <Link to="/courses-add-remove">
        <p>Enroll</p>
      </Link>
      <Link to="/manage-courses">Manage Courses</Link>
    </div>
  );
};

export default Nav;
