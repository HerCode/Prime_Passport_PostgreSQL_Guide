var pg = require('pg');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var app = express();

var index = require('./routes/index');
var User = require('./models/user');
var register = require('./routes/register');
var login = require('./routes/login');

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.use('/register', register);
app.use('/login', login);

app.use(session({
  secret: 'secret',  //never use this again!
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000, secure: false}
}));

//User Authentification Functions
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use('local', new localStrategy({ passReqToCallback: true, usernameField: 'username' },
function(request, username, password, done){
  User.findOne({ username: username},
    function(err, user){
    if(err) {
      throw err;
  }
});

 if(!user) {
      return done(null, false, {message: 'Incorrect username and password.'});
}

User.findAndComparePasswords('ryan', 'bar', function(err, match, user){
  console.log(err);
  console.log(match);
  console.log(user);

});
function handleServerStart(){
  var port = server.address().port;
var server = app.listen(3000, handleServerStart);
  console.log('Listening on port', port);
}

})
);
