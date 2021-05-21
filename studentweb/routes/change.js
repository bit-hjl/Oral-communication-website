var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/change', function (req, res) {
    // 输出 JSON 格式
    let username = req.query.username;
    let password = req.query.password;
    let newpassword = req.query.newpassword;
    let mothertongue=req.query.mothertongue;
    let want=req.query.want;
    let power=req.query.power;
    let hobby=req.query.hobby;
    let WX=req.query.WX;
    let name=req.query.name;
    var myObj = {"type": "success", "message": "更改成功！"};
    var flag = false;
    if(username != "") {
        if(username == "undefined"){
            myObj = {"type": "false", "message": "用户名不合法！"};
            res.send(myObj);
            return;
        }else{
            db.query('SELECT * FROM test WHERE username=?', [username],function (error, have, fields) {
                if (error) throw error;
                if(have.length != 0){
                    myObj={"type": "false", "message": "用户名已经存在！"};
                    res.send(myObj);
                    return;
                }
            });}
    }
    db.query('SELECT * FROM test WHERE username=?', [name],function (error, users, fields) {
        if (error) throw error;
        if(username != "") {
            flag = true;
            users[0].username = username;
        }
        if(mothertongue != "") {
            users[0].mothertongue = mothertongue;
            flag = true;
        }
        if(want != ""){
            users[0].want = want;flag = true;
        }
        if(power != ""){
            users[0].power = power;flag =true;
        }
        if(hobby != ""){
            users[0].hobby = hobby;flag = true;
        }
        if(WX != ""){
            users[0].WX = WX;flag = true;
        }
        if(newpassword != "") {
            flag = true;
            if(users[0].password == password) users[0].password = newpassword;
            else{
                myObj = {"type": "false", "message": "原密码不正确！"};res.send(myObj);
            }
        }
        if(flag && myObj.type!= "false")
        {
            db.query('DELETE  FROM test WHERE username=?', [name],function (error,del, fields) {
                if (error) throw error;
                db.query("INSERT INTO test (username,password,mothertongue,want,power,hobby,WX,name,studentid) values(?,?,?,?,?,?,?,?,?)",
                    [users[0].username,users[0].password,users[0].mothertongue,users[0].want,users[0].power,users[0].hobby,users[0].WX,users[0].name,users[0].studentid],(err,result)=>{
                        if (error) throw error;
                        db.query('UPDATE `call` SET username=? WHERE username=?', [users[0].username,name],function (error,one, fields) {
                            if (error) throw error;
                            db.query('UPDATE `call` SET other=? WHERE other=?', [users[0].username,name],function (error,two, fields) {
                                if (error) throw error;
                                db.query('UPDATE `friend` SET username=? WHERE username=?', [users[0].username,name],function (error,three, fields) {
                                    if (error) throw error;
                                    db.query('UPDATE `friend` SET friend=? WHERE friend=?', [users[0].username,name],function (error,four, fields) {
                                        if (error) throw error;
                                        res.send(myObj);
                                        return;
                                    });
                                });
                            });
                        });
                    });
            });
        }
    });
});
module.exports = router;