const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
require ('dotenv/config')
const mysql = require('mysql')
const server = app.listen(PORT = process.env.port || 8000, () => {console.log(`listening on ${PORT}`)})
const io = require('socket.io').listen(server)
// io.set('origins', 'http://localhost:8000');

const { login } = require('./apis/login')
const { signup } = require('./apis/signup')
const { getReminders } = require('./apis/getReminders')
const { getAppointments } = require('./apis/getAppointments')
const { editReminder } = require('./apis/editReminder')
const { addReminder } = require('./apis/addReminder')

const pool = mysql.createPool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
})

let activeConnections = {}


io.on('connection', (client) =>{
    console.log(`connection id ${client.id}`)
    activeConnections[client.handshake.query.id] = client
    console.log("activeConnections", Object.keys(activeConnections))
    
    client.on('editAppointment', (data) => {
        let sql = `Update appointments Set subject = '${data.subject}', aWhen = '${data.aWhen}', aWith = '${data.aWith}' where aid = ${data.aid}`
        console.log("edit appintment", sql)
        pool.query(sql, (err, result) => {
            if(err) throw err
            client.emit('editAppointment', {error: 0, subject: data.subject, aWhen: data.aWhen, aWith: data.aWith, aid: data.aid})
        })   
    });

    client.on('addAppointment', (data) => {
        let sql = `Insert into appointments (uid, aWith, subject, aWhen) Values (${data.uid}, '${data.aWith}','${data.subject}', '${data.aWhen}')`
        console.log("sql", sql)
        pool.query(sql, (err, result) => {
            if(err) client.emit('addAppointment',{error: 1})
            let obj = {error: 0, insertId: result.insertId, uid:data.uid, aWith: data.aWith, subject: data.subject, aWhen: data.aWhen}
            // console.log(obj)
            client.emit('addAppointment', obj)
        })
    })
})

app.get('/getUsers', (req, res) => {
    let sql = `Select id, username from users`
    pool.query(sql, (err, res) => {
        if(err) throw err;
        console.log(res)
        res.send(res)
    })
})

app.post('/login', (req, res) => {
    login(req, res, pool)
}) 
//signup id
app.post('/signup', (req, res) => {
    signup(req, res, pool)
})

app.post('/getReminders', (req, res) => {
    getReminders(req, res, pool)
})

app.post('/getAppointments', (req, res) => {
    getAppointments(req, res, pool)
})


app.post('/editReminder', (req, res) => {
    editReminder(req, res, pool)
})

app.post('/addReminder', (req, res) => {
    addReminder(req, res, pool)
})