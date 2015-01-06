


$.fn.chartProduction = function (scope) {
    var deductArrays = function (x, y) {
      var result=[];
      for (var i = 0; i<x.length; i++) {
        result[i] = x[i] - y[i];
      }
      return result;
    }
    $('#production').highcharts({
        chart: {
            type: 'column',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var capacity = this.series[0];
                    var production = this.series[1];
                    var self = this;
  
                    scope.ourOn('chartProduction', function (dataFromSocket) {
                        var data = dataFromSocket[dataFromSocket.length-1];
                        capacity.addPoint(data.capacity-data.energy, false, true);
                        production.addPoint(data.energy, false, true);
                        timeblock.push(data.blockStart);
                        self.redraw();
                    });
                    // scope.$digest();
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
                text: 'MW'
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
            name: 'Spare capacity',
            data: deductArrays(_.pluck(scope.dataFromSocket, "capacity"), _.pluck(scope.dataFromSocket, "energy")),
            dataLabels: {
              format: '{point.y:,.0f}',
              color: '#1874cd'
            },
            color: '#f0ffff',
            borderColor: '#1874cd'
        }, {
            name: 'Production',
            data: _.pluck(scope.dataFromSocket, "energy"),
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#1874cd',
            borderColor: '#1874cd'
        }]
    });
}