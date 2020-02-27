var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/',forwardAuthenticated,(req, res) => res.render('home'));

// Dashboard
router.get('/dash',ensureAuthenticated,(req, res) =>
  res.render('dash', {
    user: req.user
  })
);



router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});

router.get('/404', function(req, res) {
  res.render('404');
});

router.get('/basket', function(req, res) {
  res.render('basket');
});

router.get('/blog', function(req, res) {
  res.render('blog');
});

router.get('/category', function(req, res) {
  res.render('category');
});

router.get('/category-full', function(req, res) {
  res.render('category-full');
});

router.get('/category-right', function(req, res) {
  res.render('category-right');
});

router.get('/checkout1', function(req, res) {
  res.render('checkout1');
});

router.get('/checkout2', function(req, res) {
  res.render('checkout2');
});

router.get('/checkout3', function(req, res) {
  res.render('checkout3');
});

router.get('/checkout4', function(req, res) {
  res.render('checkout4');
});

router.get('/custemor-account', function(req, res) {
  res.render('custemor-account');
});

router.get('/custemor-order', function(req, res) {
  res.render('custemor-order');
});

router.get('/custemor-orders', function(req, res) {
  res.render('custemor-orders');
});

router.get('/custemor-wishlist', function(req, res) {
  res.render('custemor-wishlist');
});

router.get('/details', function(req, res) {
  res.render('details');
});

router.get('/faq', function(req, res) {
  res.render('faq');
});

router.get('/post', function(req, res) {
  res.render('post');
});


router.get('/text', function(req, res) {
  res.render('text');
});


router.get('/text-right', function(req, res) {
  res.render('text-right');
});

module.exports = router;
