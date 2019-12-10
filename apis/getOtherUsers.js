const getOtherUsers = (req, res, pool) => {
    let sql = `Select id, username from users where id != ${req.body.id}`
    console.log("get users", sql)
    pool.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(res)
        res.send(result)
    })
}

module.exports = {
    getOtherUsers
}