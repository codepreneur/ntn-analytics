define(['app'], function(App){

  App.BaseChartView = Em.View.extend({

    tagName: 'svg',
    _elementReady: false,


    // public overrides
    prepareChart:function(){
      return nv.models.pieChart();
    },
    prepareData:function(content){
      return [];
    },

    // element is inserted into DOM
    didInsertElement:function(){

      var view = this;
      this.$().empty();

      nv.addGraph(function(){

        var chart = view.prepareChart();

        view.set('_chart', chart);
        view.set('_elementReady', true);
        return chart;
      });
    },


    mapProperties:function(content){

      var props = Array.prototype.slice.call(arguments, 1);

      var items = content.map(function(item){
        return item.getProperties(props);
      });

      return items;
    },

    _renderChart:function(){
      if(!this.get('ready')) return;

      var content = this.get('content'),
        data = this.prepareData(content);

      d3.select(this.$()[0])
        .datum(data)
        .transition().duration(200)
        .call(this.get('_chart'));

    }.observes('ready'),

    ready:function(){
      return this.get('content.isLoaded') && this.get('_elementReady');
    }.property('content.isLoaded', '_elementReady')



  });


  return App.BaseChartView;
});