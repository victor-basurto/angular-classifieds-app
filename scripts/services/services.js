'use strict';

ClassifiedsApp.factory('ClassifiedsFactory', [ '$http', function( $http ) {
	return {
		getClassifieds: function() {
			return $http.get( './data/info.json' );
		}
	};
}]);