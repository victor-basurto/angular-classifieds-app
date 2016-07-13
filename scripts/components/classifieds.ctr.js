(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		'$interval',
		function( $scope, $http, $interval ) {
			var self = this;
			
			// temporary null variable to show progress bar
			$scope.classifieds = null;
		
			/**
			 * @param {path} [file location]
			 * @param {promise} [returns promise in data object]
			 */
			$http.get( './data/info.json' ).then( function(data) {
				$scope.classifieds = data.data;
			});
			


			/**
			 * @param {callback} [Iterate every 100ms, non-stop and increment
			 						the Determinate loader.]
			 */
			self.determinateValue = 30;
			$interval( function() {
				self.determinateValue += 1;
				if ( self.determinateValue > 100 ) {
					self.determinateValue = 30;
				}
			}, 100);	

	}]);


})();