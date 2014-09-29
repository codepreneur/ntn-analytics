define(['app'], function(App){

  // Store
  App.Adapter = DS.RESTAdapter.extend();
  App.Store = DS.Store.extend({
    revision: 12,
    adapter: App.Adapter.create()
  });

  // Models
  App.Product = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    category: DS.attr('string'),

    price: DS.attr('number'),
    rating: DS.attr('number'),
    reviews: DS.attr('number')
  });

});