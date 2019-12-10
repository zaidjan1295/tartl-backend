const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require ('dotenv/config')
const { Pool } = require('pg')
const server = app.listen(PORT = process.env.port || 5000, () => {console.log(`listening on ${PORT}`)})
const io = require('socket.io').listen(server)

const { login } = require('./apis/login')
const { signup } = require('./apis/signup')
const { getReminders } = require('./apis/getReminders')
const { getAppointments } = require('./apis/getAppointments')
const { editReminder } = require('./apis/editReminder')
const { addReminder } = require('./apis/addReminder')
const { getOtherUserDetails } = require('./apis/getOtherUserDetails')
const { getOtherUsers } = require('./apis/getOtherUsers')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
// })

let activeConnections = {}

const isNotNew = (auid, action, obj) => {
    console.log("auid", auid, "hasProperty", activeConnections.hasOwnProperty(auid))
    if(auid){
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
        let sql = `Update appointments Set subject = '${data.subject}', awhen = '${data.awhen}', awith = '${data.awith}' where aid = ${data.aid}`
        console.log("edit appintment", sql)
        pool.query(sql, (err, result) => {
            if(err) throw err
            const obj = {error: 0, subject: data.subject, awhen: data.awhen, awith: data.awith, aid: data.aid}
            client.emit('editAppointment', obj )
            isNotNew(data.auid, 'editAppointment', obj)
        })   
    });

    client.on('addAppointment', (data) => {
        let sql = `Insert into appointments (uid, awith, subject, awhen) Values (${data.uid}, '${data.awith}','${data.subject}', '${data.awhen}') returning aid`
        console.log("sql", sql)
        pool.query(sql, (err, result) => {
            if(err) client.emit('addAppointment',{error: 1})
            console.log("result", result)
            const obj = {error: 0, insertId: result.rows[0].aid, uid:data.uid, awith: data.awith, subject: data.subject, awhen: data.awhen}
            console.log(obj)
            client.emit('addAppointment', obj)
            isNotNew(data.auid, 'addAppointment', obj);
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