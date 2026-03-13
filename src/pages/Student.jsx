import { useEffect, useState } from "react";

function Student({ portalData }) {
  const { student, setStudent, rollNumber, setError } = portalData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (student) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/${rollNumber}/student`);
        if (!response.ok) throw new Error("Unable to load student details.");
        setStudent(await response.json());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [student, setStudent, rollNumber, setError]);

  return (
    <section className="panel">
      <h2>Student Page</h2>
      {!student && !loading && <p>Student data is currently unavailable.</p>}
      {loading && <p>Loading student details...</p>}
      {student && (
        <div className="card-grid">
          <article className="card">
            <h3>Academic Profile</h3>
            <p>10th Percentage: {student.tenth_percentage}%</p>
            <p>City: {student.city}</p>
            <p>School: {student.school}</p>
            <p>Year of Passing: {student.year_of_passing}</p>
          </article>

          <article className="card">
            <h3>Extended Details</h3>
            <p>Course: {student.course}</p>
            <p>Email: {student.email}</p>
            <p>Roll Number: {student.roll_number}</p>
          </article>
        </div>
      )}
    </section>
  );
}

export default Student;
