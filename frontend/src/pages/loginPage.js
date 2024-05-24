import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthorizeContextHook } from "../context/hooks/useContextHook";
import { useGlobalRoleContextHook } from "../context/hooks/useContextHook";

const LoginPage = () => {
  const { authorize, authorizeDispatch } = useAuthorizeContextHook();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState("");

  useEffect(() => {
    const storedAuthorize = localStorage.getItem("toekn");
    if (storedAuthorize) {
      authorizeDispatch({
        type: "SET_AUTH",
        payload: JSON.parse(storedAuthorize),
      });
    }
  }, [authorizeDispatch]);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(authorize));
  }, [authorize]);

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setShowLoginErrorMessage(true);
    } else {
      setUsername("");
      setPassword("");
      authorizeDispatch({ type: "SET_AUTH", payload: true });
    }
  };

  return (
    <>
      {authorize && <Navigate to="/manage-assignments" />}
      <div className="container">
        <div className="bg">
          <div className="form">
            <h2>Login</h2>
            {showLoginErrorMessage && (
              <div className="login-error-msg">
                The username or password is incorrect.
              </div>
            )}
            <form onSubmit={(e) => handleSubmitLoginForm(e)}>
              <label>Login:</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <label>Password:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button>Login</button>
            </form>
            If you don't have an account yet, please{" "}
            <Link to="/register">register</Link>.
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
