const express = require("express");
const pool = require("../db");

const router = express.Router();
const roll = process.env.ROLL_NUMBER || "1234";

const studentsTable = `students_${roll}`;
const activitiesTable = `activities_${roll}`;
const subjectsTable = `Subject_${roll}`;

router.get(`/${roll}/student`, async (_req, res) => {
  try {
    const [studentRows] = await pool.query(
      `SELECT id, name, roll_number, course, email, city, school, year_of_passing, tenth_percentage FROM ${studentsTable} LIMIT 1`
    );

    if (studentRows.length === 0) {
      return res.status(404).json({ message: "Student data not found." });
    }

    const [subjectRows] = await pool.query(
      `SELECT id, course_id, description, subject_name, date FROM ${subjectsTable} ORDER BY id ASC`
    );

    return res.json({ ...studentRows[0], subjects: subjectRows });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch student data.", error: error.message });
  }
});

router.get(`/${roll}/activities`, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, description, status, date FROM ${activitiesTable} ORDER BY date DESC, id DESC`
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch activities.", error: error.message });
  }
});

router.post(`/${roll}/activities`, async (req, res) => {
  try {
    const { title, description, status, date } = req.body;
    if (!title || !description || !status || !date) {
      return res.status(400).json({ message: "title, description, status and date are required." });
    }

    const [result] = await pool.query(
      `INSERT INTO ${activitiesTable} (title, description, status, date) VALUES (?, ?, ?, ?)`,
      [title, description, status, date]
    );

    return res.status(201).json({ message: "Activity created.", id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create activity.", error: error.message });
  }
});

router.put(`/${roll}/activities/:id`, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, status, date } = req.body;
    if (!title || !description || !status || !date) {
      return res.status(400).json({ message: "title, description, status and date are required." });
    }

    const [result] = await pool.query(
      `UPDATE ${activitiesTable} SET title = ?, description = ?, status = ?, date = ? WHERE id = ?`,
      [title, description, status, date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found." });
    }

    return res.json({ message: "Activity updated." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update activity.", error: error.message });
  }
});

router.delete(`/${roll}/activities/:id`, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query(`DELETE FROM ${activitiesTable} WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found." });
    }

    return res.json({ message: "Activity deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete activity.", error: error.message });
  }
});

module.exports = router;
