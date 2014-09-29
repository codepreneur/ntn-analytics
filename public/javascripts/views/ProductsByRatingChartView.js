define(['app', './BaseChartView'], function(App, BaseChartView){

  App.ProductsByRatingChartView = BaseChartView.extend({

    prepareData:function(content){

      var items = this.mapProperties(content, 'rating');

      var groups = d3.nest()
        .key(function(d){ return d.rating; })
        .entries(items)
        .map(function(g){
          return { rating: g.key, count: g.values.length };
        });


      return [
        { key: '', values: groups }
      ];

    },

    prepareChart:function(){

      var chart = nv.models.pieChart()
        .x(function (d) {
          return d.rating + '\u2605';
        })
        .y(function (d) {
          return d.count;
        })
        .showLabels(true)
        .labelThreshold(0.05)
        .margin({left: 0, right: 0, top: 0, bottom: 0})
        .donut(true);

      return chart;
    }

  });
});