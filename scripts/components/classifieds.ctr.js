(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		function( $scope, $http ) {
			
			
			// temporary null variable to show progress bar
			$scope.classifieds = null;

		
			/**
			 * @param {path} [file location]
			 * @param {promise} [returns promise in data object]
			 */
			$http.get( './data/info.json' ).then( function(data) {
				$scope.classifieds = data.data;
			});

	}]);


})();