var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/delsend', function (req, res) {
    var username = req.query.username;
    var other = req.query.other;
    db.query('SELECT * FROM `call` WHERE username=? AND other=?', [username,other],function (error, have, fields) {
        if (error) throw error;
        if(have.length != 0){
        db.query('DELETE  FROM `call` WHERE username=? AND other=?', [username,other],function (error,del, fields) {
            if (error) throw error;
            var myObj = {"type": "success", "message":"成功了"};
            res.send(myObj);
            return;
        });}
        else {
            var myObj = {"type": "false", "message":"信息已经发生变动，请在页面刷新后再操作"};
            res.send(myObj);
            return;
        }
    });
});
module.exports = router;