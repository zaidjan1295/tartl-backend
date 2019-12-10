const getAppointments = (req, res, pool) => {
    let sql = `Select * from appointments where uid = (select id from users where username = '${req.body.username}') and aWhen >= CURDATE() union Select * from appointments where awith = '${req.body.username}' order by aid desc`;
    console.log("get appintment", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send(result);
    })
}

module.exports = {
    getAppointments
}