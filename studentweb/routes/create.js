var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/create', function (req, res) {
    // 输出 JSON 格式
    let username = req.query.username;
    let password = req.query.password;
    let repassword = req.query.repassword;
    let mothertongue=req.query.mothertongue;
    let want=req.query.want;
    let power=req.query.power;
    let hobby=req.query.hobby;
    let WX=req.query.WX;
    let name=req.query.name;
    let studentid=req.query.studentid;

    if(username == "undefined"){
        var myObj = {"type":"error","message":"用户名不合法！"};
        res.send(myObj);
        return;
    } else if(username == ""){
        var myObj = {"type":"error","message":"用户名不能为空！"};
        res.send(myObj);
        return;
    }else if(username == "null"){
        var myObj = {"type":"error","message":"用户名不合法！"};
        res.send(myObj);
        return;
    } else if(password != repassword) {
        var myObj = {"type":"error","message":"密码和再次确认的密码不一致！"};
        res.send(myObj);
        return;
    }
    else if(password == ""){
        var myObj = {"type":"error","message":"密码不能为空"};
        res.send(myObj);
        return;
    }else if(mothertongue==""){
        var myObj = {"type":"error","message":"母语不能为空"};
        res.send(myObj);
        return;
    }else if(want == ""){
        var myObj = {"type":"error","message":"请填写想要练习的口语"};
        res.send(myObj);
        return;
    }else if(power == ""){
        var myObj = {"type":"error","message":"请填写您在该口语方面的能力"};
        res.send(myObj);
        return;
    }else if(hobby == ""){
        var myObj = {"type":"error","message":"请填写您的兴趣爱好"};
        res.send(myObj);
        return;
    }else if(WX == ""){
        var myObj = {"type":"error","message":"请填写您的联系方式"};
        res.send(myObj);
        return;
    }else if(name ==""){
        var myObj = {"type":"error","message":"请填写您的姓名"};
        res.send(myObj);
        return;
    }else if(studentid==""){
        var myObj = {"type":"error","message":"请填写您的学号"};
        res.send(myObj);
        return;
    }
    db.query('SELECT username FROM test WHERE username=?', [username],function (error, users, fields) {
        if (error) throw error;
        var inUse = false;
        console.log(users);
        if(users.length != 0)
            inUse = true;
        if (inUse) {
            var myObj = {"type": "error", "message": "用户名已经存在！"};
            res.send(myObj);
        } else {
            var date = new Date();
            var time = date.toLocaleString();
            let query = db.query("INSERT INTO test (username,password,mothertongue,want,power,hobby,WX,name,studentid) values(?,?,?,?,?,?,?,?,?)",
                [username,password,mothertongue,want,power,hobby,WX,name,studentid],(err,result)=>{
                    if (error) throw error;
                });
            db.query('INSERT INTO `write` (username,time,name) values(?,?,?)', [username,time,name],function (error, use, fields) {
                if (error) throw error;
            });
            res.statusCode = 200;
            var myObj = {"type": "success", "username": username};
            res.send(myObj);
        }
    });
});
module.exports = router;