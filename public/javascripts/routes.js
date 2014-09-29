define(['app'], function(App){

  App.Router.map(function () {

    this.route('products');
  });


  // IndexRoute
  App.IndexRoute = Ember.Route.extend({

    redirect: function () {
      this.transitionTo('products');
    }
  });

  // Products Route
  App.ProductsRoute = Ember.Route.extend({

    model: function () {
      return App.Product.find({});
    }
  });

});