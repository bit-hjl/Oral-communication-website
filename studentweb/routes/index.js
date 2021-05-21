var express = require('express');
var router = express.Router();
var db = require("./db");
var fs = require('fs');
router.get('/chat', function(req, res, next) {
    var name = unescape(req.cookies.userName);
    console.log(name + " is coming!");
    if(name == "undefined")
      res.render('index', {"users":"express"});
    res.render('chat', { title: "1" });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{text1:'密码或用户名出错了，请检查用户名和密码，感谢配合',
    text2:'没有账号密码的同学可以返回登录页面去注册账号',text3:'如果您已经检查过账号密码确认无误,那多半是开发人员又出锅了，您可以' +
        '给他一顿社会的毒打。'});
});
router.get('/goto', function(req, res, next) {
  res.render('create', { title: 'Express' });
});



module.exports = router;
