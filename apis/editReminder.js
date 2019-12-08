const editReminder = (req, res, pool) => {
    let sql = `Update reminders Set subject = '${req.body.subject}', rWhen = '${req.body.rWhen}', description = '${req.body.description}' where rid = ${req.body.rid}`
    console.log("edit reminder", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send({error: 0})
    })
}

module.exports = {
    editReminder
}