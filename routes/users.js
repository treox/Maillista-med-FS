var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  fs.readFile('users.json', (err, data) => {

    if (err) throw err;
    var users = JSON.parse(data);
    res.send(users);
  })

});

module.exports = router;
