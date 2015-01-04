

$.fn.chartProduction = function (queue) {
    var axis1 = _.pluck(queue, "blockStart");
    var axis2 = _.pluck(queue, "capacity");
    var axis3 = _.pluck(queue, "energy"); 
    $('#production').highcharts({
        chart: {
            type: 'column',
        },
        title: {
            text: 'Capacity and Production, MW'
        },
        xAxis: {
            categories: axis1
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
            data: axis2
        }, {
            name: 'Production',
            data: axis3
        }]
    });
}