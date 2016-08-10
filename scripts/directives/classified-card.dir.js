'use strict';

ClassifiedsApp.directive('listingCard', [ function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			classifieds: '=classifieds',
			listingsFilter: '=listingsFilter',
			category: '=category'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		controller: listingCardController,
		controllerAs: 'vm',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'templates/card/classified-card.tpl.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};

	function listingCardController( $state, $scope, $mdDialog ) {

		var vm = this;
		vm.editListing = editListing;
		vm.deleteListing = deleteListing;

		/**
		 * @param {object} `listingData` [object that its going to be edited]
		 * if functions is clicked, open sidebarnav and pass the obejct to be edited
		 */
		function editListing( listingData ) {
			$state.go( 'classifieds.edit', {
				id: listingData.$id
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
				vm.classifieds.$remove( listingData );
				showToast( 'Listing Removed', 2500 );
				// index = vm.classifieds.indexOf( listingData );
				// vm.classifieds.splice( index, 1 );
			}, function() {
				/**
				 * [TODO: If user press `cancel` then, execute this method]
				 */
				vm.status = "... keep looking the listings";
			});
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
	}
}]);