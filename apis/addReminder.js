const addReminder = (req, res, pool) => {
    let sql = `Insert into reminders (uid, description, subject, rWhen) Values (${req.body.uid}, '${req.body.description}','${req.body.subject}', '${req.body.rWhen}')`
    console.log("sql", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        res.send({error: 0, insertId: result.insertId})
    })
}

module.exports = {
    addReminder
}