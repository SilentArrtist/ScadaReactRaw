const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db',sqlite3.OPEN_READWRITE,(err)=>
{
    if(err)return console.error(err);
});
let sql;
// db.run('DROP TABLE devices')
// sql = `CREATE TABLE devices(id INTEGER PRIMARY KEY,ip,holdingRegisters,inputRegisters,coils,status)`
// db.run(sql)

// db.run('DROP TABLE save')

//Create table
// sql = `CREATE TABLE save(id INTEGER PRIMARY KEY,elements)`
// db.run(sql)


// sql = `INSERT INTO devices(ip,holdingRegisters,inputRegisters,coils,status) VALUES (?,?,?,?,?)`;
// db.run(sql,["192.168.137.1:502",`[]`,`[]`,`[]`,false],(err)=>{if(err) return console.error(err.message)})

// sql = `INSERT INTO save(elements) VALUES (?)`;
// db.run(sql,[""],(err)=>{if(err) return console.error(err.message)})


sql = `SELECT * FROM devices`
db.all(sql,[],(err,rows)=>{
    if(err) return console.error(err.message)
    console.log(rows);
})
const PORT = 4000;

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
    })
    } catch (e) {
        console.log(e)
    }
}

start()
