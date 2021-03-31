module.exports = {
    query: function (sql, callback) {
        const mysql = require('mysql')
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'bignews1'
        });
        conn.connect();
        conn.query(sql, callback);
        conn.end();
    }
}