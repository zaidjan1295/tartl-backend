const addReminder = (req, res, pool) => {
    let sql = `Insert into reminders (uid, description, subject, rwhen) Values (${req.body.uid}, '${req.body.description}','${req.body.subject}', '${req.body.rwhen}') returning rid `
    console.log("sql", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        // console.log("add reminder", result)
        res.send({error: 0, insertId: result.rows[0].rid})
    })
}

module.exports = {
    addReminder
}