const login = (req, res, pool) => {
    let sql = `SELECT id from users where (Select EXISTS(SELECT * FROM users WHERE username='${req.body.username}' and password='${req.body.password}') AS mycheck) = 1`
    console.log('sql',sql)
    pool.query(sql, (err, result) => {
        if(err) res.send({error: 1})
        // console.log('result',result[0].id)
        if(result.length){
            res.send({error: 0, id: result[0].id})
        } else {
            res.send({error: 1})   
        }
         
    })
}

module.exports = {
    login
}