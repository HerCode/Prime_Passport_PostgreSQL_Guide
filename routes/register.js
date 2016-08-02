var router = require('express').Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(request, response, next){
  response.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response){
  Users.create(request.body.username, request.body.password, function(err, post){
    if(err){
      next(err);
    } else {
      response.redirect('/');
    }
  });

});

module.exports = router;
