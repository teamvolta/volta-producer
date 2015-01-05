


$.fn.chartProduction = function () {

    $('#production').highcharts({
        chart: {
            type: 'column',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var capacity = this.series[0];
                    var production = this.series[1];
                    var self = this;

                    var socket = io('http://localhost:8010/subscriptions');
  
                    socket.on('transaction', function (data) {
                        console.log("data", data);
                        capacity.addPoint(data.capacity, false, true);
                        production.addPoint(data.energy, false, true);
                        timeblock.push(data.blockStart);
                        self.redraw();
                    });
                }
              }  
        },
        title: {
            text: 'Capacity and Production, MW'
        },
        xAxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        yAxis: {
            title: {
                text: 'MW'
            }
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
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
        }, {
            name: 'Production',
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
        }]
    });
}