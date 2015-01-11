"use strict";
app.controller("MarketController",[ '$rootScope', '$scope', '$location' ,function($rootScope, $scope, $location){

var Gigs = Parse.Object.extend("Gigs");
var gig = new Gigs();
var query = new Parse.Quaery(Gigs);

$scope.Orders = [];

//poll for new notification
setTimeout(function() {
$scope.transactions = query.find().then(function(results) {
	var holder = [];
 // Do something with the returned Parse.Object values
	for (var i = 0; i < results.length; i++) { 
	  var object = results[i];
	  holder.push({'Currency':object.get('currency'), 'Description':object.get('Description'), 'TxHash': object.get('txHash'), 'Status': object.get('Status')});    
	}
	console.log(holder[0]);
	$scope.Orders = holder;
	$scope.$apply();
	return holder;
	 //console.log(holder);
});
}, 2000);

$scope.addRow = function(currency, description, txHash, status) {
	gig.set("timestamp", Date.now());
	gig.set("user", "Uwe Cerron");
	gig.set("currency", currency);
	gig.set("description", description);
	gig.set("txHash",txHash); //505b42ec5e8499843ae3ad6f56f66ce52025d37205df19fb5777179d407b2978
	gig.set("status",status);
	gig.save(null, {
	  success: function(gig) {
	    // Execute any logic that should take place after the object is saved.
	    console.log('New object created with objectId: ' + gig.id);
	  },
	  error: function(gig, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    console.log('Failed to create new object, with error code: ' + error.message);
	  }
	});
}

}]);
