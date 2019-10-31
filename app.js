var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/mail', function (req, res) {
    var html='';
    html += "<body>";
    html += "<form action='/mail2' method='post' name='form1'>";
    html += "Your email: <input type='text' name='email'><br/>";
    html +="<input type='submit' value='submit'><br/>";
    html += "</form>";
    html += "</body>";
    res.send(html);
});

app.post('/mail2', urlencodedParser, function (req, res) {

  var test = '';
      test += '' + req.body.email + '';
    
    
    fs.readFile('users.json', (err, data) => {

        if (err) throw err;
        
        var users = JSON.parse(data);
        
        newUser = {
          "userEmail": "" + test + ""
        }
    
        users.push(newUser);
    
        var saveUsers = JSON.stringify(users, null, 2);
    
        fs.writeFile('users.json', saveUsers, (err, data) => {
          if (err) throw err;
        })
    
      res.send('Ny epost sparad!');

    })

});

module.exports = app;
