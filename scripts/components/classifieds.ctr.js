(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		'$mdSidenav',
		'$log',
		'$mdToast',
		'ClassifiedsFactory',
		function( $scope, $http, $mdSidenav, $log, $mdToast, ClassifiedsFactory ) {
			
			// temporary null variable to show progress bar
			$scope.classifieds = null;

			/**
			 * @ClassifiedsFactory {service}, [it will get the data from an external file
			 * 									through $http]
			 * @param {promise} [returns promise in data object]
			 */
			ClassifiedsFactory.getClassifieds().then( function(data) {
				$scope.classifieds = data.data;
			});

			// temporary contact data
			var contact = {
				name: 'My Funny Name',
				phone: '(123) 987-6543',
				email: 'funnyname@gmail.com'
			}

			/**
			 * [openSidebar `left sidenav` docs @angular-material]
			 */
			$scope.openSidebar = function() {
				$mdSidenav('left').open();
			}
			/**
			 * [closeSidebar `left-sidenav` close sidenav from `cancel` button
			 * 					doc @angular-material]
			 * @return {promise} [once sidenav is close, send message to console]
			 */
			$scope.closeSidebar = function() {
				$mdSidenav('left').close()
					.then( function() {
						$log.debug('Close left sidenav is done');
					});
			}

			/**
			 * @param {object} `data` [save data from sidenav]
			 * @return {object} `toast` [if data is saved, show toast to user]
			 */
			$scope.saveListing = function( data ) {
				if ( data ) {
					data.contact = contact;
					$scope.classifieds.push( data );
					$scope.closeSidebar();
				} 
				$scope.classified = {};
				$mdToast.show(
					$mdToast.simple()
						.content( 'Your Listing is Saved' )
						.position( 'top, right' )
						.hideDelay( 3000 )
				);
			}
	}]);
})();