import { useEffect, useState } from "react";

function Home({ portalData }) {
  const { rollNumber, student, setStudent, activities, setActivities, error, setError } = portalData;
  const [form, setForm] = useState({ title: "", description: "", status: "Planned", date: "" });

  const loadData = async () => {
    try {
      setError("");
      const [studentRes, activitiesRes] = await Promise.all([
        fetch(`/api/${rollNumber}/student`),
        fetch(`/api/${rollNumber}/activities`)
      ]);
      if (!studentRes.ok || !activitiesRes.ok) {
        throw new Error("API request failed.");
      }
      setStudent(await studentRes.json());
      setActivities(await activitiesRes.json());
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addActivity = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/${rollNumber}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Unable to add activity.");
      setForm({ title: "", description: "", status: "Planned", date: "" });
      await loadData();
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`/api/${rollNumber}/activities/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to delete activity.");
      await loadData();
    } catch (e) {
      setError(e.message);
    }
  };

  const markCompleted = async (activity) => {
    try {
      const response = await fetch(`/api/${rollNumber}/activities/${activity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activity.title,
          description: activity.description,
          status: "Completed",
          date: activity.date
        })
      });
      if (!response.ok) throw new Error("Unable to update activity.");
      await loadData();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="panel">
      <h2>Home Page</h2>
      {error && <p className="error">{error}</p>}

      {student && (
        <div className="card-grid">
          <article className="card">
            <h3>Basic Details</h3>
            <p>Name: {student.name}</p>
            <p>Roll Number: {student.roll_number}</p>
            <p>Course: {student.course}</p>
            <p>Email: {student.email}</p>
          </article>

          <article className="card">
            <h3>Subjects</h3>
            <ul>
              {student.subjects?.map((subject) => (
                <li key={subject.id}><strong>{subject.subject_name}</strong> - {subject.description}</li>
              ))}
            </ul>
          </article>
        </div>
      )}

      <div className="card-grid">
        <article className="card">
          <h3>Add Activity</h3>
          <form className="form-stack" onSubmit={addActivity}>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" required />
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" required />
            <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
            <button type="submit">Add Activity</button>
          </form>
        </article>

        <article className="card">
          <h3>Activities</h3>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div>
                  <strong>{activity.title}</strong> ({activity.status}) - {activity.date}
                  <p>{activity.description}</p>
                </div>
                <button className="danger" type="button" onClick={() => deleteActivity(activity.id)}>Delete</button>
                {activity.status !== "Completed" && (
                  <button type="button" onClick={() => markCompleted(activity)}>Mark Completed</button>
                )}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Home;
