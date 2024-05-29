const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(express.json());


const dotenv = require('dotenv')
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})
app.get('/', (req, res) => {
    const sql = "SELECT * FROM  student";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});


app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
    const Values = [
        req.body.name,
        req.body.email,
    ]
    db.query(sql, [Values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "update student set `Name` = ? , `Email` = ? where ID = ?";
    const Values = [
        req.body.name,
        req.body.email,
    ]
    const id = req.params.id;

    db.query(sql, [...Values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})


app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(4000,()=>{
    console.log("server is running port 4000")
})