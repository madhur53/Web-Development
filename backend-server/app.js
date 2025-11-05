const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'madhur',
    database: 'nodejsdemo'

});

db.connect((err) => {
    if(err){
        console.error('Error connecting to MySQL database: ',err);
        return;
    }

    console.log('Connected to MySQL database');
});

const getAll = "select * from customer";
const getById = "select * from customer where id = ?";
const insert = "insert into customer (fullName, emailAddress, phoneNo) values (?, ?, ?)";
const update = "update customer set fullName = ?, emailAddress = ?, phoneNo = ? where id = ?";
const deleteRec = "delete from customer where id = ?";

app.get('/customers', (req, res) => {
    db.query(getAll, (err, results) => {
        if(err) {
            console.error('Error fetching customers: ',err);
            res.status(500).json({error: 'Internal Server Error'});
            return;
        }
        res.json(results);
    });
});

app.get('/customers/:id', (req,res) => {
    const customerId = req.params.id;
    db.query(getById, customerId, (err, results) => {
        if(err){
            console.error('Error fetching customer: ',err);
            res.status(500).json({ error: 'Internal Server Error'});
            return;
        }
        res.json(results[0]);
    });
});

app.post('/customers', (req,res) => {
    const {fullName, emailAddress, phoneNo} = req.body;
    console.log(req.body);
    db.query(insert, [fullName, emailAddress, phoneNo], (err, results) => {
        if(err){
            console.error('Error creating customer: ',err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Customer created', id : results.insertId, fullName, phoneNo, emailAddress });
    });
});


app.put('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const {fullName, emailAddress, phoneNo } = req.body;
    db.query(update, [fullName, emailAddress, phoneNo, customerId], (err, results) => {
        if(err){
            console.error('Error updating customer: ', err);
            res.status(500).json({ error: 'Internal Server Error'});
            return;
        }
        res.json({ message: 'Customer updated'});
    });
});

app.delete('/customers/:id', (req,res) => {
    const customerId = req.params.id;
    db.query(deleteRec, customerId, (err, results) => {
        if(err){
            console.error('Error deleting customer :');
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ mesage: 'Customer deleted' });
    });
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});

















