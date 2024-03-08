import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";

const RegisterPage = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registrationError, setRegistationError] = useState(false);

  function verifyPassword(str) {
    return /(?=.*[A-Z])(?=.*\d)(?=.*\S)/.test(str); // at least one upper case, one digit, and no white spaces
  }

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    const checkPass = verifyPassword(password);
    if (checkPass) {
      setRegistationError(false);
      const newUser = { username, password, role };

      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      console.log(json);
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        setUsername("");
        setPassword("");
        setRole("");
        navigate("/");
      }
    } else {
      setRegistationError(true);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Registration</h2>
        <form onSubmit={(e) => handleSubmitRegisterForm(e)}>
          <label>Register:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Password:</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <select onChange={(e) => setRole(e.target.value)}>
            <option>Select role:</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
          <button>Register</button>
        </form>
        {registrationError && (
          <div>Your login or password were incorrect. Try again...</div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
