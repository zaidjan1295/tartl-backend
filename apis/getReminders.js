const getReminders = (req, res, pool) => {
    let sql = `Select * from reminders where uid = (select id from users where username = '${req.body.username}') order by rid desc`;
    console.log("getREminders", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send(result);
    })
}

module.exports = {
    getReminders
}