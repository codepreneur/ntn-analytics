// require the modules

var mongoose = require('mongoose');
var _ = require('underscore');
var async = require('async');

var models = require('./models');
var generators = require('./generators');

// Set the limit on the number of products, sales, companies

var NUM_COMPANIES = 100,
	NUM_PRODUCTS = 1000,
	NUM_SALES = 10000;

// Connect to mongo 

function run(){
	mongoose.set('debug', true);
	mongoose.connect('mongodb://localhost/analytics');
	var connection = mongoose.connection;

	connection.on('error', console.error.bind(console, 'connection error'));
	connection.once('open', seed);
}

// Run the seed 

function seed(){

	var db = mongoose.connection.db;

	async.waterfall([

		// Clean
		function(cb){
			db.dropDatabase(cb);
		},

		// Insert
		generateCompanies(NUM_COMPANIES),
		generateProducts(NUM_PRODUCTS),
		generateSales(NUM_SALES)

	], function(err, results){
		if (err) console.log('Failed to seed the "analytics" DB');

		mongoose.disconnect();
	});

}

// 1. Generate companies

function generateCompanies(count){

	var generateCompany = generators.Company();

	return function(__ignore, cb){

		var createFns = _.range(count).map(function(){
			var company = generateCompany();
			return models.Company.create.bind(models.Company, company);
		});

		return async.parallel(createFns, cb);
	};
};


// 2. Generate products

function generateProducts(count){

	var generateProduct = generators.Product();

	return function(companies, cb){
		var companyIds = companies.map(function(c){ return c.id; });

		var createFns = _.range(count).map(function(){
			return models.Product.create.bind(models.Product, generateProduct(companyIds));
		});

		return async.parallel(createFns, cb);
	};
};


// 3. Generate sales

function generateSales(count){
	var generateSale = generators.Sale();

	return function(products, cb){
		var productIds = products.map(function(c){ return c.id; });

		var createFns = _.range(count).map(function(){
			var sale = generateSale(productIds);
			return models.Sale.create.bind(models.Sale, sale);
		});

		return async.parallel(createFns, cb);
	};
};


if (require.main === module) run();



