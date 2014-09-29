var express = require('express');
var router = express.Router();
var models = require('../db/models');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NTN Analytics' });
});

// Products

router.get('products', function(req, res){
	models.Product.find({}, 'name description price category rating reviews')
    .exec(function(err, docs){

      res.send({
        products: docs
      });
      
    });  
})

module.exports = router;
