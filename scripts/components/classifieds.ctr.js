(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		'$mdSidenav',
		'$log',
		'ClassifiedsFactory',
		function( $scope, $http, $mdSidenav, $log, ClassifiedsFactory ) {
			
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

			/**
			 * [openSidebar `left sidenav` docs @angular-material]
			 */
			$scope.openSidebar = function() {
				$mdSidenav('left').open();
			}
			/**
			 * [closeSidebar `left sidenav` close sidenav from `cancel` button
			 * 					doc @angular-material]
			 * @return {promise} [once sidenav is close, send message to console]
			 */
			$scope.closeSidebar = function() {
				$mdSidenav('left').close()
					.then( function() {
						$log.debug('Close left sidenav is done');
					});
			}
	}]);
})();