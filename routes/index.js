var express = require('express');
var router = express.Router();
var Product=require('../models/products');





/* GET home page. */
router.get('/', function(req, res, next) {

  var products=Product.find(function(err, docs){
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));

    }
    res.render('shop/index', { title: 'Shopping Cart',products:productChunks });
  });

});

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}
router.get('/profile', isAuthenticated,function(req, res, next) {


  var user=req.session.user;

  res.render('profile',{username:user.username,email:user.email});
});
router.get('/loggedout', isAuthenticated,function(req, res, next) {
  req.logout();

  res.redirect('/');
});
module.exports = function(passport){

  /* GET login page. */
  router.get('/signin', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('signin', { message: req.flash('message') });
  });

  /* Handle Login POST */
  router.post('/signin', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    var messages=req.flash('error');
    res.render('signup',{messages:messages,hasErrors:messages.length>0});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/', isAuthenticated, function(req, res){
    res.render('/', { user: req.user });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){




    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/signin');
  }
}


