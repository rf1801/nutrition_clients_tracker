const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));



// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,       // Your MySQL username
  password: process.env.MYSQL_PASSWORD, // Your MySQL password
  database: process.env.MYSQL_DATABASE  // The name of your database
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Route to handle client data insertion
app.post('/save-client', (req, res) => {
  // Destructure the French form field names from the request body
  const { first_name, last_name, phone, address, profession, family_status} = req.body;

  // SQL query with English column names and placeholders
  const sql = 'INSERT INTO Clients (first_name, last_name, phone, address, profession, family_status) VALUES (?, ?, ?, ?, ?, ?)';

  // Map French form values to the corresponding English column names
  const values = [first_name, last_name, phone, address, profession, family_status];

  // Execute the query to insert the data
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).send('Failed to save client data.');
    } else {
      res.status(200).send('Client saved successfully!');
    }
  });
});

// Endpoint to get all clients
app.get('/get-clients', (req, res) => {
  const sql = 'SELECT * FROM clients';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching clients:', error);
      res.status(500).send('Server error');
    } else {
      res.json(results);  // Send the client data as JSON

    }
  });
});

app.get('/get-measurements', (req, res) => {
  const clientId = req.query.client_id;

  if (!clientId) {
    return res.status(400).json({ error: 'Client ID is required' });
  }
  const sql = 'SELECT * FROM measurements WHERE client_id = ?';
  connection.query(sql, [clientId], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }


    res.json(results);
  });
});



app.post('/save-measurements', (req, res) => {
  const {
    client_id,
    date,
    height_cm,
    weight_kg,
    neck_cm,
    chest_cm,
    arm_right_cm,
    arm_left_cm,
    waist_cm,
    hip_cm,
    thigh_right_cm,
    thigh_left_cm
  } = req.body;

  // SQL query to insert measurements into the table
  const sql = `INSERT INTO measurements (client_id, date, height_cm, weight_kg, neck_cm, chest_cm, arm_right_cm, arm_left_cm, waist_cm, hip_cm, thigh_right_cm, thigh_left_cm)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  console.log('dooone')
  console.log(height_cm)
  // Execute the query
  connection.query(sql, [
    client_id, date, height_cm, weight_kg, neck_cm, chest_cm, arm_right_cm, arm_left_cm, waist_cm, hip_cm, thigh_right_cm, thigh_left_cm
  ], (error, results) => {
    if (error) {
      console.error('Error saving measurements:', error);
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    // Success response
    res.status(200).json({ success: true, message: 'Measurements saved successfully' });
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
