import { useState } from "react";

function Login({ onLogin, rollNumber }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onLogin({ username, password });
    setMessage(result.ok ? "Login successful." : result.message);
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login Required</h2>
        <p>Use roll number as username. Demo roll number: {rollNumber}</p>
        <p>Demo password: Secure@1234</p>

        <label htmlFor="username">Username (Roll No)</label>
        <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="1234" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Strong password" required />

        <button type="submit">Sign In</button>
        <p className="status-text">{message}</p>
      </form>
    </div>
  );
}

export default Login;
