'use strict';

ClassifiedsApp.factory('ClassifiedsFactory', [ 
	'$http',
	'$firebaseArray',
	'FIREBASE_URL',
	function( $http, $firebaseArray, FIREBASE_URL ) {
	
		// function getClassifieds() {
		// 	return $http.get( './data/info.json' );
		// }

		// Connection to Firebase
		var ref = new Firebase( FIREBASE_URL );

		return {
			ref: $firebaseArray( ref )
		}
}]);