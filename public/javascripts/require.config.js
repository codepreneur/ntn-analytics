require.config({
	baseUrl: 'javascripts',
	paths: {
		'jquery': 'vendor/jquery.min',
		'jquery-ui': 'vendor/jquery-ui.min',
		'd3': 'vendor/d3.v3.min',
		'nvd3': 'vendor/nv.d3',
		'hbs': 'vendor/handlebars-v1.3.0',
		'ember': 'vendor/ember',
		'ember-data': 'vendor/ember-data',
	},

	shim: {
		'ember': {
			deps: ['jquery', 'hbs'],
			exports: 'Ember'
		},

		'ember-data': ['ember'],
		'nvd3': ['d3'],
		'jquery-ui': ['jquery'],
		'd3': {
			exports: 'd3'
		}
	}
});

// Initialise require to load the app

require([
  'app',

  'routes',
  'controllers',
  'store',


  // views
  'views/ProductsByRatingChartView'

]);