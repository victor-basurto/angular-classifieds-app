(function() {
	'use strict';

	ClassifiedsApp.controller( 'EditClassifiedCtrl', [ 
		'$scope',
		'$mdSidenav', 
		'$mdDialog',
		'$timeout',
		'$state',
		'ClassifiedsFactory',
		function( $scope, $mdSidenav, $mdDialog, $timeout, $state, ClassifiedsFactory ) {
			var vm = this;

			vm.classifieds = ClassifiedsFactory.ref;
			vm.classified = vm.classifieds.$getRecord( $state.params.id );
			vm.closeSidebar = closeSidebar;
			vm.saveEditListing = saveEditListing;

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
			 * [saveEditListing pass message to parent controller]
			 * @return {Boolean} [boolean to close sidenav]
			 */
			function saveEditListing() {
				vm.classifieds.$save( vm.classified ).then( function() {
					$scope.$emit( 'savedEdit', 'Your Edit has been Saved' );
					vm.sidenavOpen = false;
				});
			}
	}]);
})();