const getOtherUsers = (req, res, pool) => {
    let sql = `Select id, username from users where id != ${req.body.id}`
    console.log("get users", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err;
        // console.log("otherusers", result)
        res.send(result.rows)
    })
}

module.exports = {
    getOtherUsers
}