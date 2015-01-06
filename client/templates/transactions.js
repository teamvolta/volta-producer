angular.module('producerFrontEnd.transactions', [])

.controller('TransactionsController', function ($scope, getSocket) {
  angular.extend($scope, getSocket);
  var transactions = $scope.dataFromSocket;
  for (var i=0; i< $scope.targetLength; i++) {
  	if (!(transactions[i].price === 0 &&
	      transactions[i].capacity === 0 &&
//	      transactions[i].blockStart === i+1 &&
          transactions[i].energy === 0 && 
          transactions[i].costs === 0)) {
      var nextDate = new Date(1000*transactions[i].blockStart);
  	  var nextrow = '<tr><td class = blockStart>'+nextDate+'</td><td class = output>'+Math.round(transactions[i].energy)+'</td><td class = setPrice>'+Math.round(transactions[i].price)+'</td></tr>';
      $('tbody').prepend(nextrow);
  	}
  }
  $scope.ourOn('TransactionsController', function (dataFromSocket) {

  	var data = dataFromSocket[dataFromSocket.length-1];
  	var myDate = new Date(1000*data.blockStart);
  	var newrow = '<tr><td class = blockStart>'+myDate+'</td><td class = output>'+Math.round(data.energy)+'</td><td class = setPrice>'+Math.round(data.price)+'</td></tr>';
    $('tbody').prepend(newrow);
   })
});