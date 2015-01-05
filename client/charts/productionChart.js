


$.fn.chartProduction = function (socket) {

    $('#production').highcharts({
        chart: {
            type: 'column',
            events: {
                load: function() {
                    var timeblock = this.xAxis[0].categories;
                    var capacity = this.series[0];
                    var production = this.series[1];
                    var self = this;

                    
  
                    socket.on('transaction', function (data) {
                        console.log("data", data);
                        capacity.addPoint(data.capacity-data.energy, false, true);
                        production.addPoint(data.energy, false, true);
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dataLabels: {
              format: '{point.y:,.0f}',
              color: '#1874cd'
            },
            color: '#f0ffff',
            borderColor: '#1874cd'
        }, {
            name: 'Production',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dataLabels: {
              format: '{point.y:,.0f}',
            },
            color: '#1874cd',
            borderColor: '#1874cd'
        }]
    });
}