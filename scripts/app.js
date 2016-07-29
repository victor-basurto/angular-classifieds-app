'use strict';

var ClassifiedsApp = angular.module('ClassifiedsApp', 
	[ 'ngMaterial', 'ui.router', 'firebase' ])
		.constant('FIREBASE_URL', 'https://ng-classified-app.firebaseio.com/');;

/**
 * Configuration
 */
ClassifiedsApp.config([ 
	'$mdThemingProvider', 
	'$stateProvider', 
	function( $mdThemingProvider, $stateProvider ) {
		$mdThemingProvider.theme( 'default' )
			.primaryPalette( 'teal' )
			.accentPalette( 'orange' );

		$stateProvider
			.state( 'classifieds', {
				url: '/classifieds',
				templateUrl: 'templates/classifieds.tpl.html',
				controller: 'ClassifiedCtrl as vm'
			}).state( 'classifieds.new', {
				url: '/new',
				templateUrl: 'templates/new-classifieds.tpl.html',
				controller: 'NewClassifiedCtrl as vm'
			}).state('classifieds.edit', {
				url: '/edit/:id',
				templateUrl: 'templates/edit-classifieds.tpl.html',
				controller: 'EditClassifiedCtrl as vm',
				params: {
					classified: null
				}
			});
}]);

