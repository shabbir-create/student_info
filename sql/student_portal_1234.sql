
CREATE DATABASE IF NOT EXISTS student_portal_1234;
USE student_portal_1234;

CREATE TABLE IF NOT EXISTS students_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(20) NOT NULL UNIQUE,
  course VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  city VARCHAR(80) NOT NULL,
  school VARCHAR(120) NOT NULL,
  year_of_passing INT NOT NULL,
  tenth_percentage DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('Planned', 'In Progress', 'Completed') NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Subject_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  description VARCHAR(250) NOT NULL,
  subject_name VARCHAR(120) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students_1234
  (name, roll_number, course, email, city, school, year_of_passing, tenth_percentage)
VALUES
  ('Shabbir', '1234', 'B.Tech CSE', 'shabbir6075@gmail.com', 'Pali', 'V.M.S Senior Secondary School', 2022, 89.40)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  course = VALUES(course),
  email = VALUES(email),
  city = VALUES(city),
  school = VALUES(school),
  year_of_passing = VALUES(year_of_passing),
  tenth_percentage = VALUES(tenth_percentage);

INSERT INTO Subject_1234 (course_id, description, subject_name, date) 
VALUES
  (1, 'Data structures and problem solving', 'Data Structures', '2026-01-10'),
  (1, 'Web development with React ecosystem', 'Frontend Engineering', '2026-01-11'),
  (1, 'Database design and SQL operations', 'Database Management', '2026-01-12'),
  (1, 'Introduction to machine learning algorithms and models', 'Machine Learning', '2026-01-13'),
  (1, 'Concepts of process management, memory management, and scheduling', 'Operating Systems', '2026-01-14'),
  (1, 'Software development lifecycle and agile methodologies', 'Software Engineering', '2026-01-17');

INSERT INTO activities_1234 (title, description, status, date) VALUES
  ('Build Student Portal', 'Design React pages and router for assignment', 'In Progress', '2026-02-25'),
  ('MySQL Practice', 'Create roll-based tables and seed records', 'Planned', '2026-02-27');

SELECT name, email FROM students_1234;
