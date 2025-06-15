const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');

app.use(express.json());
app.use('/api/employees', employeeRoutes);

app.get('/healthcheck', (req, res) => {
  res.send(true);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
