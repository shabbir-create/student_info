import { useEffect, useState } from "react";

function Academic({ portalData }) {
  const { student, setStudent, rollNumber, setError } = portalData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (student) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/${rollNumber}/student`);
        if (!response.ok) throw new Error("Unable to load academic subjects.");
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
      <h2>Academic Page</h2>
      {!student && !loading && <p>Academic data is currently unavailable.</p>}
      {loading && <p>Loading subjects...</p>}

      {student && (
        <article className="card">
          <h3>All Subjects ({student.subjects?.length || 0})</h3>
          <ul>
            {student.subjects?.map((subject) => (
              <li key={subject.id}>
                <strong>{subject.subject_name}</strong> - {subject.description}
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}

export default Academic;
