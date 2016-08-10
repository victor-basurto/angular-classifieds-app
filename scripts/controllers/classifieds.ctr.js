(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [
		'$scope',
		'$http', 
		'$mdSidenav',
		'$log',
		'$mdToast',
		'$mdDialog',
		'$state',
		'$timeout',
		'ClassifiedsFactory',
		function( $scope, $http, $mdSidenav, $log, $mdToast, $mdDialog, $state, $timeout, ClassifiedsFactory ) {
			
			var vm = this;

			vm.categories;
			vm.classified = {};
			vm.classifieds = {};
			vm.clearFilter = clearFilter;
			vm.closeSidebar = closeSidebar;
			// vm.deleteListing = deleteListing;
			vm.editing;
			// vm.editListing = editListing;
			// vm.onSaveEdit = onSaveEdit;
			vm.openSidebar = openSidebar;
			vm.saveListing = saveListing;

			// temporary null variable to show progress bar
			vm.spinner = true;

			/**
			 * [let spinner shows for 2 seconds, then set variable into object reference from firebase]
			 * @return {Callback} [set vm.classifieds to object from firebase]
			 * @return {Promise} [once classifieds are loaded, then set categories to function that 
			 					returns the categories of the classifieds]
			 */
			
				vm.classifieds = ClassifiedsFactory.ref;
				vm.classifieds.$loaded().then( function( classifieds ) {
					vm.categories = getCategories( classifieds );
					vm.spinner = false;
				});

			/**
			 * @ClassifiedsFactory {service}, [it will get the data from an external file
			 * 									through $http]
			 * @param {promise} [returns promise in data object]
			 * [`getCategories` - populate categories from classifieds data]
			 */

			// ClassifiedsFactory.getClassifieds().then( function(data) {
			// 	vm.classifieds = data.data;
			// 	vm.categories = getCategories( vm.classifieds );
			// });

			/**
			 * [add new listing]
			 * @param {Method} `newListing` [method from child controller]
			 * @param  {Callback} event 	[event]
			 * @param  {Object} `listingData` [object that will be saved from child controller
			 *                                listingData.id [temporary id]]
			 * @return {Method} `showToast` [show toast if data is saved]
			 */
			$scope.$on( 'newListing', function( event, listingData ) {
				
				vm.classifieds.$add( listingData );

				// listingData.id = vm.classifieds.length + 1;		without firebase
				// vm.classifieds.push( listingData );		without firebase
				showToast( 'Listing Saved', 3000 );
			});

			/**
			 * [save edited listing]
			 * @param {Method} `saveEdit` [method from child controller]
			 * @param  {Callback} event 	[event]
			 * @param  {String} `message` [String-Msg that will be showed up from child controller]
			 * @return {Method} `showToast` [show toast if data is saved]
			 */
			$scope.$on( 'savedEdit', function( event, message ) {
				closeSidebar();
				showToast( message, 3000 );
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
			function openSidebar() {
				// $mdSidenav('left').open();
				$state.go( 'classifieds.new' );
			}
			/**
			 * [closeSidebar `left-sidenav` close sidenav from `cancel` button
			 * 					doc @angular-material]
			 * @return {promise} [once sidenav is close, send message to console]
			 */
			function closeSidebar() {
				$mdSidenav('left').close()
					.then( function() {
						$log.debug('Close left sidenav is done');
					});
				vm.classified = {};
				vm.editing = false;
			}

			/**
			 * @param {object} `data` [save data from sidenav]
			 * @return {object} `toast` [if data is saved, show toast to user]
			 */
			function saveListing( data ) {
				if ( data ) {
					data.contact = contact;
					vm.classifieds.push( data );
					console.log()
				} 
				closeSidebar();
				showToast( 'Your Listing is Saved', 3000 );
			}

			/**
			 * [onSaveEdit - triggers closeSidebar func, then clears fields]
			 */
			// function onSaveEdit() {
			// 	vm.editing = false;
			// 	vm.classified = {};
			// 	closeSidebar();
			// 	showToast( 'The Edit has been Saved', 4000);
			// }

			/**
			 * [clearFilter - clears input fields]
			 */
			function clearFilter() {
				vm.listingsFilter = "";
				vm.category = "";
			}

			/**
			 * [showToast - rehusable toast]
			 * @param {String} `content` [message to be delivered]
			 * @param {Number} `delay` [declare waiting time in the Toast]
			 */
			function showToast( content, delay ) {
				$mdToast.show(
					$mdToast.simple()
						.content( content )
						.position( 'top, right' )
						.hideDelay( delay  )
				);
			}

			/**
			 * [`getCategories` - receives an object and iterates through it until it gets 
			 					value from inner array, using lodash _.uniq()]
			 * @param {object} `listings` [data from json file]
			 * @return {object} `categories` [only desired categories to be shown in users interface]
			 */
			function getCategories( listings ) {
				var categories = [];

				angular.forEach( listings, function( item ) {
					angular.forEach( item.categories, function( category ) {
						categories.push( category );
					});
				});
				return _.uniq( categories );
			}

	}]);
})();