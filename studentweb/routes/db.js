
var mysql = require('mysql');
function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
       connect();
    }
}

// 连接数据库
function connect () {
    var db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '12345',
        database : 'test',
        useConnectionPooling: true
    });
    db.connect(handleError);
    db.on('error', handleError);
    module.exports = db;
}
var db;

connect();
