(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ 
		'$scope', 
		'$http', 
		'$mdSidenav',
		'$log',
		'$mdToast',
		'$mdDialog',
		'ClassifiedsFactory',
		function( $scope, $http, $mdSidenav, $log, $mdToast, $mdDialog, ClassifiedsFactory ) {
			
			// temporary null variable to show progress bar
			$scope.classifieds = null;

			/**
			 * @ClassifiedsFactory {service}, [it will get the data from an external file
			 * 									through $http]
			 * @param {promise} [returns promise in data object]
			 * [`getCategories` - populate categories from classifieds data]
			 */
			ClassifiedsFactory.getClassifieds().then( function(data) {
				$scope.classifieds = data.data;
				$scope.categories = getCategories( $scope.classifieds );
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
				showToast( 'Your Listing is Saved', 3000 );
			}

			/**
			 * @param {object} `listingData` [object that its going to be edited]
			 * if functions is clicked, open sidebarnav and pass the obejct to be edited
			 */
			$scope.editListing = function( listingData ) {
				$scope.editing = true;
				$scope.openSidebar();
				$scope.classified = listingData;
			}

			/**
			 * [deleteListing - delete current listing from classifieds]
			 * @param  {listingData} `listingData` [pass current listing into an array]
			 */
			$scope.deleteListing = function( event, listingData ) {
				var index, 
					confirm = $mdDialog.confirm();
				
				confirm.title( 'Are you sure you want to delete this item ' + listingData.title + '?' )
					.ok( 'Yes' )
					.cancel( 'No' )
					.targetEvent( event );
				$mdDialog.show( confirm ).then( function() {
					index = $scope.classifieds.indexOf( listingData );
					$scope.classifieds.splice( index, 1 );
					console.log( 'succesfully deleted' );
				}, function() {
					/**
					 * [TODO: If user press `cancel` then, execute this method]
					 */
					$scope.status = "... keep looking the listings";
				});
			}

			/**
			 * [onSaveEdit - triggers closeSidebar func, then clears fields]
			 */
			$scope.onSaveEdit = function() {
				$scope.editing = false;
				$scope.classified = {};
				$scope.closeSidebar();
				showToast( 'The Edit has been Saved', 4000);
			}

			$scope.clearFilter = function() {
				$scope.listingsFilter = "";
				$scope.category = "";
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