var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/call', function (req, res) {
    let username = req.query.username;
    let other = req.query.friend;
    db.query('SELECT * FROM `call` WHERE username=? AND other=?', [username,other],function (error, call, fields) {
        if (error) throw error;
        let len = call.length;
        if(len != 0){
            var Obj = {"type":"error","message":"您申请过了！请耐心等待回复"};
            res.send(Obj);
            return;
        }
        db.query('SELECT * FROM `call` WHERE username=? AND other=?', [other,username],function (error, call2, fields) {
            if (error) throw error;
            let len = call2.length;
            if(len != 0){
                var Obj = {"type":"error","message":"对方向你发送的好友还未处理！赶紧去好友申请里同意TA的申请吧！"};
                res.send(Obj);
                return;
            }
            db.query('SELECT `friend` FROM friend WHERE (username=? AND friend=?) OR (friend=? AND username=?)', [username,other,username,other],function (error, f1, fields) {
                if (error) throw error;
                let len = f1.length;
                if(len != 0){
                    var Obj = {"type":"error","message":"你们已经是好友了"};
                    res.send(Obj);
                    return;
                }
                db.query('SELECT username FROM `test` WHERE username=?', [other],function (error, use, fields) {
                    if (error) throw error;
                    if(use.length == 0) {
                        var Obj = {"type":"error","message":"查无此人！对方可能更改了用户名，请刷新页面重试！"};
                        res.send(Obj);
                        return;
                    }
                    db.query('INSERT INTO `call` (username,other) values(?,?)', [username,other],function (error, use, fields) {
                        if (error) throw error;
                        var Obj = {"type":"success","message":"成功！"};
                        res.send(Obj);
                        return;
                    })
                });
            });
        });
    });
});
module.exports = router;