


$.fn.chartProfit = function (socket) {

    $('#profit').highcharts({
        chart: {
            type: 'column',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var costs = this.series[0];
                    var profit = this.series[1];
                    var self = this;

                    
  
                    socket.on('transaction', function (data) {
                        console.log("data", data);
                        costs.addPoint(data.costs * data.energy, false, true);
                        profit.addPoint((data.price-data.costs)*data.energy, false, true);
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#ff7256'
        }, {
            name: 'Profit',
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#007f00'
        }]
    });
}