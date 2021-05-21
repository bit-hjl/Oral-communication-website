var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/main', function (req, res) {
    var name = unescape(req.cookies.userName);
    console.log(name);
    if(name == "undefined") {
        res.render('index', {"users":"express"});
        return;
    }
    else{
        db.query('SELECT username,mothertongue,want,power,hobby,WX FROM `test` WHERE username!=?', [name],function (error, users, fields) {
            if (error) throw error;
            db.query('SELECT * FROM `test` WHERE username=?', [name],function (error, my, fields) {
                if (error) throw error;
                db.query('SELECT other FROM `call` WHERE username=?', [name],function (error, c1, fields) {
                    if (error) throw error;
                    db.query('SELECT username FROM `call` WHERE other=?', [name],function (error, c2, fields) {
                        if (error) throw error;
                        db.query('SELECT username FROM `friend` WHERE friend=?', [name],function (error, f1, fields) {
                            if (error) throw error;
                            db.query('SELECT friend FROM `friend` WHERE username=?', [name],function (error, f2, fields) {
                                if (error) throw error;
                                var call = [];var called = [];var friend = [];
                                for(var i = 0;i < c1.length;i++){
                                    for(var j =0;j < users.length;j++){
                                        if(c1[i].other == users[j].username){
                                            call[i] = users[j];
                                            break;
                                        }
                                    }
                                }
                                for(var i = 0;i < c2.length;i++){
                                    for(var j =0;j < users.length;j++){
                                        if(c2[i].username == users[j].username){
                                            called[i] = users[j];
                                            break;
                                        }
                                    }
                                }
                                var k = 0;
                                for(var i = 0;i < f1.length;i++){
                                    for(var j =0;j < users.length;j++){
                                        if(f1[i].username == users[j].username){
                                            friend[k++] = users[j];
                                            break;
                                        }
                                    }
                                }
                                for(var i = 0;i < f2.length;i++){
                                    for(var j =0;j < users.length;j++){
                                        if(f2[i].friend == users[j].username){
                                            friend[k++] = users[j];
                                            break;
                                        }
                                    }
                                }
                                res.render('main', {"users":users,"name":name,"my":my,"friend":friend,"call":call,"called":called});
                                return;
                            });
                        });
                    });
                });
            });
        });}
});
module.exports = router;