'use strict';

var ClassifiedsApp = angular.module('ClassifiedsApp', [ 'ngMaterial', 'ui.router' ]);

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
			});
}]);

