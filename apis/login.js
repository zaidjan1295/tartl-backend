const login = (req, res, pool) => {
    let sql = `SELECT * FROM users WHERE username='${req.body.username}' and password='${req.body.password}'`
    console.log('sql',sql)
    pool.query(sql, (err, result) => {
        if(err) {            
            res.send({error: 1})
            throw err;
        }
        else {
            // console.log("result.rows", result.rows)
            if(result.rows.length){
                res.send({error: 0, id: result.rows[0].id})
            } else {
                res.send({error: 1})   
            }
        }
        
         
    })
}

module.exports = {
    login
}