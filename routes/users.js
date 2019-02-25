let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    res.render("users", { title: "users" });
    res.end()
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
