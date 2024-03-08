import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";

const LoginPage = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState("");

  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    authorizeDispatch({ type: "SET_AUTH", payload: true });
  }

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    const userToLogin = { username, password };

    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: { "Content-Type": "application/json" },
    });

    const usersData = await response.json();

    console.log("VERIFY USER CONTROLLER");
    if (response.ok) {
      const token = usersData.token;
      const role = usersData.user.role;
      localStorage.setItem("token", token);
      console.log("Login successful");
      console.log(role);
      authorizeDispatch({ type: "SET_AUTH", payload: true });
    } else {
      setShowLoginErrorMessage(true);
    }
  };

  return (
    <div className="container">
      <div className="bg">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={(e) => handleSubmitLoginForm(e)}>
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
            <button>Login</button>
          </form>
          Or <Link to="/register">Register</Link>
          {showLoginErrorMessage && (
            <div>The username or the password are incorrect.</div>
          )}
          {authorize && <Navigate to="/" />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
