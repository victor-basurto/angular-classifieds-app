'use strict';

var ClassifiedsApp = angular.module('ClassifiedsApp', [ 'ngMaterial' ]);

/**
 * Configuration
 */
ClassifiedsApp.config( [ '$mdThemingProvider', function( $mdThemingProvider ) {
	$mdThemingProvider.theme( 'default' )
		.primaryPalette( 'teal' )
		.accentPalette( 'orange' );
}]);