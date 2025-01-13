const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aliyah_hani1', // Your database password
    database: 'HospitalSystem' // Your database name
});

db.connect(err => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Add a doctor
app.post('/doctors', (req, res) => {
    const { name, specialty, phone } = req.body;
    const sql = 'INSERT INTO Doctors (Name, Specialty, Phone) VALUES (?, ?, ?)';
    db.query(sql, [name, specialty, phone], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Doctor added.');
        }
    });
});

// Add a patient
app.post('/patients', (req, res) => {
    const { name, age, illness, doctorID } = req.body;
    const sql = 'INSERT INTO Patients (Name, Age, Illness, DoctorID) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, age, illness, doctorID], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Patient added.');
        }
    });
});

// Get all doctors
app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM Doctors';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Get all patients
app.get('/patients', (req, res) => {
    const sql = `
        SELECT Patients.Name AS PatientName, Patients.Age, Patients.Illness, Doctors.Name AS DoctorName
        FROM Patients
        INNER JOIN Doctors ON Patients.DoctorID = Doctors.DoctorID;
    `;
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
