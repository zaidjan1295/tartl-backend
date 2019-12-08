const signup = (req, res, pool) => {
    // console.log(req.body)
    let sql = `SELECT EXISTS(SELECT * FROM users WHERE username='${req.body.username}') AS mycheck`;
    pool.query(sql, (err, result) => {
        if(err) throw err
        if(result[0].mycheck === 1){
            res.send({error: 1, msg: 'already exists'})
        } else {
            sql = `INSERT INTO USERS (username, password) VALUES ('${req.body.username}', '${req.body.password}')`
            pool.query(sql, (err, result) => {
                if(err) {
                    res.send({error: 1, msg:'went wrong'})
                    throw err;
                }
                res.send({error: 0, msg:'user created', id: userId});
            })
        }
    })
}

module.exports = {
    signup
}