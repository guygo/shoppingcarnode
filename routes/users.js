var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
// get profile

router.use('/', NotIsLoggedIn,function(req, res, next) {
  next();
});

// Register
router.get('/signup', function(req, res){

  res.render('signup');
});

// Login
router.get('/Signin', function(req, res){

  res.render('Signin');
});

// Register User
router.post('/signup', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('signup',{
      errors:errors
    });
  } else {
    var newUser = new User({
      name: name,
      email:email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/signin');
  }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){

            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
    }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/Signin',
    passport.authenticate('local', { failureRedirect:'/users/signin',failureFlash: true}),
    function(req, res) {

      res.redirect('/users/profile');
    });

router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/signin');
});

function IsLoggedIn(req, res, next){
    if(req.isAuthenticated())
    {
      return next();
    }
  res.redirect('/');
}
function NotIsLoggedIn(req, res, next){
  if(!req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/');
}

module.exports = router;