var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/agree', function (req, res) {
    var username = req.query.username;
    var other = req.query.other;
    db.query('SELECT * FROM `call` WHERE username=? AND other=?', [other,username],function (error, have, fields) {
        if (error) throw error;
        if(have.length != 0){
            db.query('DELETE  FROM `call` WHERE username=? AND other=?', [other,username],function (error,del, fields) {
                if (error) throw error;
                db.query('INSERT INTO `friend` (username,friend) values(?,?)', [username,other],function (error, use, fields) {
                    if (error) throw error;
                    var Obj = {"type":"success","message":"成功！"};
                    res.send(Obj);
                    return;
                });
            });
        }
        else{
        var Obj = {"type":"false","message":"信息已经发生变动，请刷新页面后再操作"};
        res.send(Obj);
        return;}
    });
});
router.get('/disagree', function (req, res) {
    var username = req.query.username;
    var other = req.query.other;
    db.query('SELECT * FROM `call` WHERE username=? AND other=?', [other,username],function (error, have, fields) {
        if (error) throw error;
        if(have.length != 0){
            db.query('DELETE  FROM `call` WHERE username=? AND other=?', [other,username],function (error,del, fields) {
                if (error) throw error;
                var Obj = {"type":"success","message":"成功！"};
                res.send(Obj);
                return;
            });
        }else{
        var Obj = {"type":"false","message":"信息已经发生变动，请刷新页面后再操作"};
        res.send(Obj);
        return;
        }
    });
});
router.get('/delfriend', function (req, res) {
    var username = req.query.username;
    var friend = req.query.friend;
    db.query('SELECT * FROM `friend` WHERE (username=? AND friend=?) OR (username=? AND friend=?)', [friend,username,username,friend],function (error, have, fields) {
        if (error) throw error;
        if(have.length != 0){
            db.query('DELETE FROM `friend` WHERE (username=? AND friend=?) OR (username=? AND friend=?)', [friend,username,username,friend],function (error,del, fields) {
                if (error) throw error;
                var Obj = {"type":"success","message":"成功！"};
                res.send(Obj);
                return;
            });
        }else{
            var Obj = {"type":"false","message":"信息已经发生变动，请刷新页面后再操作"};
            res.send(Obj);
            return;
        }
    });
});

module.exports = router;