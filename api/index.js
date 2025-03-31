const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 保存训练记录
app.post('/api/training-records', async (req, res) => {
  try {
    const { student, taskTitle, timeUsed } = req.body;
    const [result] = await db.execute(
      'INSERT INTO training_records (student_name, task_title, time_used) VALUES (?, ?, ?)',
      [student, taskTitle, timeUsed]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取训练记录
app.get('/api/training-records', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM training_records ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 保存训练任务
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, content } = req.body;
    const [result] = await db.execute(
      'INSERT INTO tasks (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取所有任务
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
