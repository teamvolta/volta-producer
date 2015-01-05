


$.fn.chartPrice = function (socket) {
    $('#price').highcharts({
        chart: {
            type: 'spline',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var price = this.series[0];
                    var costs = this.series[1];
                    var self = this;

                    
  
                    socket.on('transaction', function (data) {
                        console.log("data", data);
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dataLabels: {
              format: '{point.y:,.0f}',
            }
        },  {
            name: 'Costs per MWH',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dataLabels: {
              format: '{point.y:,.0f}',
            }
        }]
    });
}