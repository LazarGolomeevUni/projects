const express = require('express');
const { createPool } = require("mysql");

const app = express();

app.use(express.json())

//MySQL connection
const pool = createPool({
    host: "34.32.226.52",
    user: "root",
    password: "password"
})

app.get("/projects", (req, res) => {
    const user = JSON.parse(req.headers['user']);
    pool.query(`select * from projectsdb.projects where userId=${user.id}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            posts = result;

            res.json(posts);
        }
    })
});

app.post("/project", (req, res) => {
    try {
        const user = JSON.parse(req.headers['user']);
        const sql = `INSERT INTO projectsdb.projects (name, description, userId)
               VALUES ('${req.body.name}', "${req.body.description}", ${user.id})`;
        pool.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("result: " + res)
            }
        })
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.use('/', (req, res, next) => {
    return res.status(200).json({ "msg": "Hello from Projects" })
})

app.listen(8003, () => {
    console.log('Projects is listening to port 8003')
})
