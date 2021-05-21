var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/del', function (req, res) {
    var name = req.query.name;
    db.query('DELETE  FROM test WHERE username=?', [name],function (error,del, fields) {
        if (error) throw error;
        db.query('DELETE  FROM `call` WHERE username=?', [name],function (error,del, fields) {
            if (error) throw error;
            db.query('DELETE  FROM `call` WHERE other=?', [name],function (error,del, fields) {
                if (error) throw error;
                db.query('DELETE  FROM `friend` WHERE username=?', [name],function (error,del, fields) {
                    if (error) throw error;
                    db.query('DELETE  FROM `friend` WHERE friend=?', [name],function (error,del, fields) {
                        if (error) throw error;
                        var myObj = {"type": "success", "message":"成功了"};
                        res.send(myObj);
                        return;
                    });
                });
            });
        });
    });
});
module.exports = router;