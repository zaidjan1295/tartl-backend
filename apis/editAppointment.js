const editAppointment = (data, pool, emit) => {
    console.log(data, pool, emit)
    let sql = `Update appointments Set subject = '${data.subject}', aWhen = '${data.aWhen}', aWith = '${data.aWith}' where aid = ${data.aid}`
    console.log("edit appintment", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err
        emit({error: 0})
    })
}

module.exports = {
    editAppointment
}