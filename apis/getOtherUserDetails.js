const getOtherUserDetails = (req, res, pool) => {
    let sql = `select awhen from appointments where (uid = ${req.body.id} or awith='${req.body.username}') and awhen >= current_date union select rwhen from reminders where uid = ${req.body.id} and rwhen >= current_date`
    console.log("get other users", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        console.log("result", result)
        res.send(result.rows)
    })
}

module.exports = {
    getOtherUserDetails
}