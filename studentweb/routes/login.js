var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/login', function (req, res){
    let username = req.query.username;
    let password = req.query.password;
    db.query('SELECT password,name FROM test WHERE username=?', [username],function (error, result, fields) {
        if (error) throw error;
        var t = 0;
        if(result.length == 0)
            t = 0;
        else if(result[0].password != password)
            t = -1;
        else t = 1;
        if(t === 0)
            var myObj = {"type":"error","message":"用户名不存在！"};
        else if(t == -1)
            var myObj = {"type":"error","message":"账号或密码错误"};
        else {
            var myObj = {"type":"success","username":username};
            var date = new Date();
            var time = date.toLocaleString();
            db.query('INSERT INTO `write` (username,time,name) values(?,?,?)', [username,time,result[0].name],function (error, use, fields) {
                if (error) throw error;
            });
        }
        res.send(myObj);
        return;
    });
});
module.exports = router;
