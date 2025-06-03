const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(express.static('public'));
app.use(express.json());

// Helper functions to read/write DB
const readData = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Routes
app.get('/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.post('/users', (req, res) => {
  const data = readData();
  const newUser = req.body;
  newUser.id = data.users.length ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
  data.users.push(newUser);
  writeData(data);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const data = readData();
  const userId = parseInt(req.params.id);
  const index = data.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    data.users[index] = { ...data.users[index], ...req.body };
    writeData(data);
    res.json(data.users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const data = readData();
  const userId = parseInt(req.params.id);
  data.users = data.users.filter(u => u.id !== userId);
  writeData(data);
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
