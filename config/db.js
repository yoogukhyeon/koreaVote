const mysql = require('mysql');

const db_info = {
    host: 'my-first-server.cjqobb24fq3v.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'dkswoah589318!!',
    database: 'blog',
    dialect : "mysql",
    timezone : "+09:00"
}



module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}