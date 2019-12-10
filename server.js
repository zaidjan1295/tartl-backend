const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require ('dotenv/config')
const mysql = require('mysql')
const server = app.listen(PORT = process.env.port || 8000, () => {console.log(`listening on ${PORT}`)})
const io = require('socket.io').listen(server)

const { login } = require('./apis/login')
const { signup } = require('./apis/signup')
const { getReminders } = require('./apis/getReminders')
const { getAppointments } = require('./apis/getAppointments')
const { editReminder } = require('./apis/editReminder')
const { addReminder } = require('./apis/addReminder')
const { getOtherUserDetails } = require('./apis/getOtherUserDetails')
const { getOtherUsers } = require('./apis/getOtherUsers')

const pool = mysql.createPool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
})

let activeConnections = {}

const isNotNew = (auid, action) => {
    console.log("auid", auid)
    if(!auid){
        if(activeConnections.hasOwnProperty(auid)){
            activeConnections[auid].emit(action, obj)
            console.log("notification sent")
        }
    }
}

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
            isNotNew(data.auid, 'editAppointment')
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
            isNotNew(data.auid, 'addAppointment');
        })
    })
})

app.post('/getUsers', (req, res) => {
   getOtherUsers(req, res, pool)
})

app.post('/login', (req, res) => {
    login(req, res, pool)
}) 

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

app.post('/getOtherUsersDetails', (req, res) => {
    getOtherUserDetails(req, res, pool)
})