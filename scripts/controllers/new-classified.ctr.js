(function() {
	'use strict';

	ClassifiedsApp.controller( 'NewClassifiedCtrl', [
		'$scope',
		'$mdSidenav', 
		'$mdDialog',
		'$timeout',
		'$state',
		'ClassifiedsFactory', 
		function( $scope, $mdSidenav, $mdDialog, $timeout, $state, ClassifiedsFactory ) {
			var vm = this;

			vm.closeSidebar = closeSidebar;
			vm.saveListing = saveListing;

			/**
			 * [$mdSidenav- will be executed once the route is changed, then the left 
			 *  sidenav will be open]
			 * @param  {callback} ) {	$mdSidenav('left').open();	} [execute this method
			 *                      						after certain amount of time]
			 */
			$timeout(function() {
				$mdSidenav('left').open();
			});

			/**
			 * [watch for changes on sidenav boolean]
			 * @param  {String} `md.sidenavOpen` [value that it will be watched]
			 * @param {Callback} sidenav [pass boolean value from client side]
			 * @return {Promise} [if user clicks on `cancel` trigger .close(), if `closed` redirect
			 *                    user to #/classifieds]
			 */
			$scope.$watch( 'vm.sidenavOpen', function( sidenav ) {
				if ( sidenav === false ) {
					$mdSidenav('left')
						.close()
						.then( function() {
							$state.go( 'classifieds' );
						});
				}
			});

			/**
			 * [closeSidebar - close left sidenavbar]
			 * @return {Boolean} [return false]
			 */
			function closeSidebar() {
				vm.sidenavOpen = false;
			}

			/**
			 * @param {object} `data` [save data from sidenav]
			 * @return {object} `toast` [if data is saved, show toast to user]
			 */
			function saveListing( listingData ) {
				if ( listingData ) {
					// temporary contact data		
					listingData.contact = {
						name: 'My Funny Name',
						phone: '(123) 987-6543',
						email: 'funnyname@gmail.com'
					}
					$scope.$emit( 'newListing', listingData );
					vm.sidenavOpen = false;
				}
			}
	}]);
})();