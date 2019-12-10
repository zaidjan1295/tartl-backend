const getOtherUserDetails = (req, res, pool) => {
    let sql = `select aWhen from appointments where uid = ${req.body.id} and aWhen >= CURDATE() union select rWhen from reminders where uid = ${req.body.id} and rWhen >= CURDATE()`
    console.log("get other users", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
}

module.exports = {
    getOtherUserDetails
}