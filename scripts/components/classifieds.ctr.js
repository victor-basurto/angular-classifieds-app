(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		'ClassifiedsFactory',
		function( $scope, $http, ClassifiedsFactory ) {
			
			// temporary null variable to show progress bar
			$scope.classifieds = null;

			/**
			 * ClassifiedsFactory, it will get the data from an external file
			 * through $http
			 * @param {promise} [returns promise in data object]
			 */
			ClassifiedsFactory.getClassifieds().then( function(data) {
				$scope.classifieds = data.data;
			});
	}]);
})();