


$.fn.chartPrice = function (scope) {
    $('#price').highcharts({
        chart: {
            type: 'spline',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var price = this.series[0];
                    var costs = this.series[1];
                    var self = this;

                    
  
                    scope.ourOn('chartPrice', function (dataFromSocket) {
                        var data = dataFromSocket[dataFromSocket.length-1];
                        price.addPoint(data.price, false, true);
                        costs.addPoint(data.costs, false, true);
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
                text: 'USD/MWH'
            },
            min: 0
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
            name: 'Price',
            data: _.pluck(scope.dataFromSocket, "price"),
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#007f00'
        },  {
            name: 'Costs per MWH',
            data: _.pluck(scope.dataFromSocket, "costs"),
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#ff7256'
        }]
    });
}