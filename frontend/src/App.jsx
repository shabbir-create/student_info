import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import About from "./pages/About";
import Academic from "./pages/Academic";
import Login from "./pages/Login";

const ROLL_NUMBER = "1234";
const STUDENT_NAME = "Shabbir khan";
const VALID_PASSWORD = "Secure@1234";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  const portalData = useMemo(
    () => ({
      rollNumber: ROLL_NUMBER,
      studentName: STUDENT_NAME,
      student,
      activities,
      setStudent,
      setActivities,
      error,
      setError
    }),
    [student, activities, error]
  );

  const handleLogin = ({ username, password }) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (username !== ROLL_NUMBER) {
      return { ok: false, message: "Username must be your roll number." };
    }
    if (!strongPassword.test(password)) {
      return {
        ok: false,
        message: "Password must include uppercase, lowercase, number, special character and 8+ length."
      };
    }
    if (password !== VALID_PASSWORD) {
      return { ok: false, message: "Invalid credentials." };
    }
    setIsLoggedIn(true);
    return { ok: true };
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} rollNumber={ROLL_NUMBER} />;
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <h1>Student Information Portal</h1>
        <nav>
          <Link className={location.pathname === "/" ? "active-link" : ""} to="/">Home</Link>
          <Link className={location.pathname === "/about" ? "active-link" : ""} to="/about">About</Link>
          <Link className={location.pathname === "/academic" ? "active-link" : ""} to="/academic">Academic</Link>
          <Link className={location.pathname === "/student" ? "active-link" : ""} to="/student">Student</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home portalData={portalData} />} />
          <Route path="/about" element={<About portalData={portalData} />} />
          <Route path="/academic" element={<Academic portalData={portalData} />} />
          <Route path="/student" element={<Student portalData={portalData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">Roll No: {ROLL_NUMBER} | Student: {STUDENT_NAME}</footer>
    </div>
  );
}

export default App;
