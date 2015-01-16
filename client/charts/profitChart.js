$.fn.chartProfit = function(scope) {

  var calculateInitialCosts = function(costsPerUnitArray, productionArray, durationArray) {
    var result = [];
    for (var i = 0; i < costsPerUnitArray.length; i++) {
      result[i] = costsPerUnitArray[i] * productionArray[i] * durationArray[i] / 1000 / 3600;
    }
    return result;
  }

  var calculateInitialProfit = function(pricePerUnitArray, costsPerUnitArray, productionArray, durationArray) {
    var result = [];
    for (var i = 0; i < pricePerUnitArray.length; i++) {
      result[i] = (pricePerUnitArray[i] - costsPerUnitArray[i]) * productionArray[i] * durationArray[i] / 1000 / 3600;
    }
    return result;
  }

  $('#profit').highcharts({
    chart: {
      type: 'column',
      events: {
        load: function() {
          var timeblock = this.xAxis[0].categories;
          var costs = this.series[0];
          var profit = this.series[1];
          var self = this;
          scope.ourOn('newInfo', function(dataFromSocket) {
            var data = dataFromSocket[dataFromSocket.length - 1];
            costs.addPoint(data.costs * data.energy * data.blockDuration / 1000 / 3600, false, true);
            profit.addPoint((data.price - data.costs) * data.energy * data.blockDuration / 1000 / 3600, false, true);
            timeblock.push(data.blockStart);
            self.redraw();
          });
        }
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: _.pluck(scope.dataFromSocket, "blockStart"),
      type: 'datetime',
      labels: {
        format: '{value:%l-%M-%S-%P}',
        rotation: 90,
        align: 'left'
      }
    },
    yAxis: {
      title: {
        text: 'USD'
      }
    },
    tooltip: {
      pointFormat: "{point.y:,.0f}"
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          style: {
            textShadow: '0 0 3px black'
          }
        }
      }
    },
    series: [{
      name: 'Costs',
      data: calculateInitialCosts(_.pluck(scope.dataFromSocket, "costs"), _.pluck(scope.dataFromSocket, "energy"), _.pluck(scope.dataFromSocket, "blockDuration")),
      dataLabels: {
        format: '{point.y:,.0f}',
      },
      color: '#ff7256'
    }, {
      name: 'Profit',
      data: calculateInitialProfit(_.pluck(scope.dataFromSocket, "price"), _.pluck(scope.dataFromSocket, "costs"), _.pluck(scope.dataFromSocket, "energy"), _.pluck(scope.dataFromSocket, "blockDuration")),
      dataLabels: {
        format: '{point.y:,.0f}'
      },
      color: '#007f00'
    }]
  });
}