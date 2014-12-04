'use strict';

angular.module('chart', [])

.directive("chart", function( $http, Twitter, Stocks) {
  return {
    restrict: 'E',
    templateUrl: 'chart.html',
    controllerAs: 'chart',
    link: function(scope,element,attributes){
      scope.chart = null;
      scope.gauge = null;
      //function to render graphs
      scope.graphsRender = function(query){
      // stock data
      Stocks.get(query).then(function(data){
        return data;
      }).then(function(stockData){
          // return Twitter.get(query).then(function(data){
            return {
              // twitter: data,
              stocks: stockData
            };
          // })
      }).then(function(API){



        //Split columns
        var splitColumn = function(stockData, column){
            return stockData.split('\n').map(function(line) {
              var columns = line.split(','); // get the columns
              columns.splice(column, 1); // remove total column
              return columns;
            }).join('\n');
        };

        //closing data
        var closingData = splitColumn(API.stocks,0);
        //time data
        var dateData = splitColumn(API.stocks,1);

      //   //closing average
      //   for( var i = 0, sum; i < closingData.length; i++) {
      //       sum += closingData[i];
      //   }
      //   var closingAverage = sum / closingData.length;



      //convert dates to epoch time
      dateData = dateData.split('\n');
      for (var i = 0; i< dateData.length; i++ ){
        dateData[i] = new Date(dateData[i]).getTime() / 1000;
      };
      //set up data for chart
      closingData = closingData.split('\n');
      var chartData = [];
      for (i=0;i<dateData.length;i++){
        chartData.push([dateData[i],parseFloat(closingData[i])]);
      }
      chartData.shift();
      console.log(chartData)
      //


      //CHART

            // $('#container').append('<h1>HEY</h1>');
            // Create the chart
            $('#container').highcharts('StockChart', {


                rangeSelector : {
                    selected : 1
                },

                // title : {
                //     text : query +' Stock Price'
                // },

                series : [{
                    name : query,
                    data : chartData,
                    tooltip: {
                        valueDecimals: 2
                    }
                }],
                series2 : [{
                    name : 'Tweets',
                    data : [[0,35],[1,46],[2,29],[3,20],[4,34],[5,23],[6,15],[7,19],[8,20]],
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });



         //correlation function
        //  function getPearsonCorrelation(x, y) {
        //     var shortestArrayLength = 0;

        //     if(x.length == y.length) {
        //         shortestArrayLength = x.length;
        //     } else if(x.length > y.length) {
        //         shortestArrayLength = y.length;
        //         console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
        //     } else {
        //         shortestArrayLength = x.length;
        //         console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
        //     }

        //     var xy = [];
        //     var x2 = [];
        //     var y2 = [];

        //     for(var i=0; i<shortestArrayLength; i++) {
        //         xy.push(x[i] * y[i]);
        //         x2.push(x[i] * x[i]);
        //         y2.push(y[i] * y[i]);
        //     }

        //     var sum_x = 0;
        //     var sum_y = 0;
        //     var sum_xy = 0;
        //     var sum_x2 = 0;
        //     var sum_y2 = 0;

        //     for(var i=0; i< shortestArrayLength; i++) {
        //         sum_x += x[i];
        //         sum_y += y[i];
        //         sum_xy += xy[i];
        //         sum_x2 += x2[i];
        //         sum_y2 += y2[i];
        //     }

        //     var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
        //     var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
        //     var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
        //     var step4 = Math.sqrt(step2 * step3);
        //     var answer = step1 / step4;

        //     return answer;
        //   };

        // //twitter/stock correlation
        // var correlation = getPearsonCorrelation(closingAverage);


        //CORRELATION GAUGE
        var gauge = c3.generate({
            bindto: '#gauge',
            data: {
                columns: [
                    ['data', 99.9]
                ],
                type: 'gauge',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            gauge: {
        //        label: {
        //            format: function(value, ratio) {
        //                return value;
        //            },
        //            show: false // to turn off the min/max labels.
        //        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
                threshold: {
        //            unit: 'value', // percentage is default
        //            max: 200, // 100 is default
                    values: [30, 60, 90, 100]
                }
            },
            size: {
                height: 180
            }
        });

        setTimeout(function () {
            gauge.load({
                columns: [['data', 32.4]]
            });
        }, 1000);

        });
      }
    }
  }
});

