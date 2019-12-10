const signup = (req, res, pool) => {
    // console.log(req.body)
    let sql = `SELECT EXISTS(SELECT * FROM users WHERE username='${req.body.username}') AS mycheck`;
    pool.query(sql, (err, result1) => {
        if(err) throw err
        if(result1.rows[0].mycheck === 1){
            res.send({error: 1, msg: 'already exists'})
        } else {
            sql = `INSERT INTO USERS (username, password) VALUES ('${req.body.username}', '${req.body.password}') returning id`
            console.log("sql",sql)
            pool.query(sql, (err, result2) => {
                if(err) {
                    res.send({error: 1, msg:'went wrong'})
                    throw err;
                }
                res.send({error: 0, msg:'user created', id: result2.rows[0].id});
            })
        }
    })
}

module.exports = {
    signup
}