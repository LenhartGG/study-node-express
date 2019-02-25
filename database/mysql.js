
let mysql = require("mysql");
let dbConfig = require("./config.js");

// 连接数据库
let db = mysql.createConnection(dbConfig.mysqlCfg);
// 失败后自动重连
function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}
// 重新连接
function connect () {
    db.connect(handleError);
    db.on('error', handleError);
}

// 查询语句
let query = function (sql, options, callback) {
    db.query(sql, options, function (error, results, fields) {
        if( error ){
            console.log('[select error] - ', error.message);
            return;
        }
        //nodejs连接MySQL后去掉 RowDataPacket
        let results = JSON.parse(JSON.stringify(results));
        let fields = JSON.parse(JSON.stringify(fields));
        console.log("-------------------------------------------------------------")
        console.log("sql: ");
        console.log(sql)
        console.log('查询结果results: ');
        console.log(results)
        console.log('数据库信息: ');
        console.log(fields)
        //事件驱动回调函数
        callback(results, fields);
    });
};


module.exports = {
    query: query
}; 