function About({ portalData }) {
  const { studentName } = portalData;

  return (
    <section className="panel">
      <h2>About Page</h2>
      <article className="card single-card">
        <p>
          {studentName} enjoys designing interactive web interfaces, solving coding problems, and experimenting
          with modern JavaScript frameworks. Outside academics, hobbies include reading technology blogs, playing
          chess, and sketching UI layouts for personal projects.
        </p>
        <p>
          Interests are focused on full-stack development, clean API design, and building practical projects that
          connect frontend experiences with real backend data.
        </p>
      </article>
    </section>
  );
}

export default About;
