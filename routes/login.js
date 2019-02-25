let express = require('express');
let app = express();
let path = require('path');
let router = express.Router();
let db = require('../database/mysql');

router.get('/', function (req, res) {

  try {
    res.render("login", { title: "login" });
    res.end()
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', function (req, res) {
  let userInfo = req.body;
  let cookie_value = "rangeRandom"
  let success = { ret_code: 1, ret_msg: userInfo, cookie: cookie_value };
  res.json(success);
})

/**
 * 取随机数
 * @param {number} m start
 * @param {number} n end
 */
function rangeRandom(m, n) {
  let num = Math.floor(Math.random() * (m - n) + n);
  return num;
}


router.post('/register', function (req, res) {
  let success = { ret_code: 1, ret_msg: "success" };
  let existed = { ret_code: 2, ret_msg: "existed" };

  let userInfo = req.body;
  let cookie_value = "rangeRandom";

  let username = userInfo.username;
  let password = userInfo.password;
  let tableName = 'Login_hliu047';

  let promise = new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `" + tableName + "` where `username` = '" + username + "'";
    db.query(sql, [], (results, fields) => {
      if (results.length > 1) {
        resolve();
      } else {
        let sql = "INSERT INTO " + tableName + "(username, password) VALUES ?";
        let values = [[username, password]];
        db.query(sql, [values], (results, fields) => {
          reject();
        })
      }
    });
  });
  promise.then(() => {
    res.json(existed)
  }, () => {
    res.json(success)
  })
})

module.exports = router;