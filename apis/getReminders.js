const getReminders = (req, res, pool) => {
    let sql = `Select * from reminders where uid = (select id from users where username = '${req.body.username}') and rwhen >= current_date order by rid desc`;
    console.log("getREminders", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        // console.log("results", result)
        res.send(result.rows);
    })
}

module.exports = {
    getReminders
}