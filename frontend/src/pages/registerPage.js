import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";

const RegisterPage = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistationError] = useState(false);

  function verifyPassword(str) {
    return /(?=.*[A-Z])(?=.*\d)(?=.*\S)/.test(str); // at least one upper case, one digit, and no white spaces
  }

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    const checkPass = verifyPassword(password);
    if (checkPass) {
      setRegistationError(false);
      const newUser = { username, password };

      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        setUsername("");
        setPassword("");
        navigate("/manage-assignments");
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
          <label>Login:</label>
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
          <button>Register</button>
        </form>
        <div className="password-warning">
          Password should contain at least one upper case, one digit, and no
          white spaces.
        </div>
        {registrationError && (
          <div>
            Your password should contain at least one upper case, one digit, and
            no white spaces. Please try again!
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
