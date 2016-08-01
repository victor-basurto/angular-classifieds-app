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
			vm.clearFilter = clearFilter;
			vm.closeSidebar = closeSidebar;
			vm.deleteListing = deleteListing;
			vm.editing;
			vm.editListing = editListing;
			// vm.onSaveEdit = onSaveEdit;
			vm.openSidebar = openSidebar;
			vm.saveListing = saveListing;

			// temporary null variable to show progress bar
			vm.classifieds = null;

			/**
			 * [let spinner shows for 2 seconds, then set variable into object reference from firebase]
			 * @return {Callback} [set vm.classifieds to object from firebase]
			 * @return {Promise} [once classifieds are loaded, then set categories to function that 
			 					returns the categories of the classifieds]
			 */
			$timeout(function() {
				vm.classifieds = ClassifiedsFactory.ref;
				vm.classifieds.$loaded().then( function( classifieds ) {
					vm.categories = getCategories( classifieds );
				});
			}, 2000);


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
			 * @param {object} `listingData` [object that its going to be edited]
			 * if functions is clicked, open sidebarnav and pass the obejct to be edited
			 */
			function editListing( listingData ) {
				$state.go( 'classifieds.edit', {
					id: listingData.id,
					classified: listingData

				});
				// vm.editing = true;
				// vm.classified = listingData;
				// openSidebar();
			}

			/**
			 * [deleteListing - delete current listing from classifieds]
			 * @param  {listingData} `listingData` [pass current listing into an array]
			 */
			function deleteListing( event, listingData ) {
				var index, 
					confirm = $mdDialog.confirm();
				
				confirm.title( 'Are you sure you want to delete this item ' + listingData.title + '?' )
					.ok( 'Yes' )
					.cancel( 'No' )
					.targetEvent( event );
				$mdDialog.show( confirm ).then( function() {
					index = vm.classifieds.indexOf( listingData );
					vm.classifieds.splice( index, 1 );
					console.log( 'succesfully deleted' );
				}, function() {
					/**
					 * [TODO: If user press `cancel` then, execute this method]
					 */
					vm.status = "... keep looking the listings";
				});
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