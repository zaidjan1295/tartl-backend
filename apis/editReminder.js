const editReminder = (req, res, pool) => {
    let sql = `Update reminders Set subject = '${req.body.subject}', rwhen = '${req.body.rwhen}', description = '${req.body.description}' where rid = ${req.body.rid}`
    console.log("edit reminder", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send({error: 0})
    })
}

module.exports = {
    editReminder
}