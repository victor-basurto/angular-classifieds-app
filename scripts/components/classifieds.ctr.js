(function() {
	'use strict';

	ClassifiedsApp.controller( 'ClassifiedCtrl', [ '$scope', function( $scope ) {
		$scope.classifieds = [{
			"id": "1",
			"title": "Angular Shirt",
			"description": "AngularJS Shirt for Men. Comes in different colors amd sizes.",
			"price": 25.00,
			"posted": "2016-06-04",
			"contact": {
				"name": "ng-fanboy",
				"phone": "(555) 555-5555",
				"email": "fanboy@gmail.com"
			},
			"categories": [
				"Clothes",
				"Shirts"
			],
			"image": "./images/shirts/angularjs-hero.jpg",
			"altname": "angular shirt",
			"views": 212
		}, {
			"id": "2",
			"title": "Black Angular Shirt",
			"description": "AngularJS Shirt for Men. Comes in different colors amd sizes. Black Color for Perfection",
			"price": 23.00,
			"posted": "2016-07-02",
			"contact": {
				"name": "ng-fanboy",
				"phone": "(555) 555-5555",
				"email": "fanboy@gmail.com"
			},
			"categories": [
				"Clothes",
				"Shirts"
			],
			"image": "./images/shirts/black-ng.jpg",
			"altname": "angular black shirt",
			"views": 200
		}, {
			"id": "3",
			"title": "I <3 JS Shirt",
			"description": "JS Shirt. Hello World from Javascript, Prototyping Based Scripting Programming Language. I live on the WEB",
			"price": 19.99,
			"posted": "2016-07-07",
			"contact": {
				"name": "ng-fanboy",
				"phone": "(555) 555-5555",
				"email": "fanboy@gmail.com"
			},
			"categories": [
				"Clothes",
				"Shirts"
			],
			"image": "./images/shirts/js-brown-shirt.jpg",
			"altname": "i love javascript",
			"views": 175
		}, {
			"id": "4",
			"title": "MEAN-Stack Shirt",
			"description": "MEAN-Stack Shirt, Mongo, Express, Angular, Node... Javascript from Frontend to Backend.",
			"price": 24.99,
			"posted": "2016-06-20",
			"contact": {
				"name": "ng-fanboy",
				"phone": "(555) 555-5555",
				"email": "fanboy@gmail.com"
			},
			"categories": [
				"Clothes",
				"Shirts"
			],
			"image": "./images/shirts/mean-shirt.jpg",
			"altname": "MEAN stack shirt",
			"views": 242
		}, {
			"id": "5",
			"title": "NG-ANGULAR Shirt",
			"description": "AngularJS Shirt for Men. Black ng-directive shirt, for developers and programmers and for the rest of the world",
			"price": 21.00,
			"posted": "2016-07-20",
			"contact": {
				"name": "ng-fanboy",
				"phone": "(555) 555-5555",
				"email": "fanboy@gmail.com"
			},
			"categories": [
				"Clothes",
				"Shirts"
			],
			"image": "./images/shirts/ng.jpg",
			"altname": "ng directive shirt",
			"views": 197
		}, {
			"id": "6",
			"title": "Babies are Back",
			"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil explicabo inventore facilis, amet eaque laboriosam quis,",
			"price": 12.00,
			"posted": "2016-03-09",
			"contact": {
				"name": "Mr Accesories",
				"phone": "(760) 123-4567",
				"email": "mraccesories@gmail.com"
			},
			"categories": [ "Accesories" ],
			"image": "./images/accesories/babysuit.jpg",
			"altname": "baby suit",
			"views": 165
		}, {
			"id": "7",
			"title": "Javascript Mug",
			"description": "Great Mug about Javascript programming language explicabo inventore facilis, amet eaque laboriosam quis,",
			"price": 9.99,
			"posted": "2015-08-29",
			"contact": {
				"name": "Mr Accesories",
				"phone": "(760) 123-4567",
				"email": "mraccesories@gmail.com"
			},
			"categories": [ "Accesories" ],
			"image": "./images/accesories/javascript-mug.jpg",
			"altname": "javascript mug",
			"views": 172
		}, {
			"id": "8",
			"title": "Coffee Javadcript",
			"description": "Bring your Javascript Coffee everywhere. Nihil explicabo inventore facilis, amet eaque laboriosam quis,",
			"price": 8.25,
			"posted": "2016-04-15",
			"contact": {
				"name": "Mr Accesories",
				"phone": "(760) 123-4567",
				"email": "mraccesories@gmail.com"
			},
			"categories": [ "Accesories" ],
			"image": "./images/accesories/js-coffe-termo.jpg",
			"altname": "js termo",
			"views": 160
		}, {
			"id": "9",
			"title": "Blue Pillow",
			"description": "Blue pillow for more information please visit our website. Nihil explicabo inventore facilis, amet eaque laboriosam quis,",
			"price": 12.99,
			"posted": "2015-07-25",
			"contact": {
				"name": "Home Decor Guy",
				"phone": "(888) 888-8888",
				"email": "homedecorguy@gmail.com"
			},
			"categories": [
				"Home",
				"Decor"
			],
			"image": "./images/home/bluepillow.jpg",
			"altname": "blue pillow",
			"views": 150
		}, {
			"id": "10",
			"title": "Flag Pillow",
			"description": "Celebrate this July 4th with the Pillow of Jusitce. consectetur adipisicing elit. Nihil explicabo inventore facilis, amet eaque laboriosam quis,",
			"price": 13.99,
			"posted": "2016-11-15",
			"contact": {
				"name": "Home Decor Guy",
				"phone": "(888) 888-8888",
				"email": "homedecorguy@gmail.com"
			},
			"categories": [
				"Home",
				"Decor"
			],
			"image": "./images/home/flag-pillow.jpg",
			"altname": "flag pillow",
			"views": 182
		}, {
			"id": "11",
			"title": "Yellow Pillow",
			"description": "This Yellow pillow is considered the best pillow because it makes you feel confortable, amet eaque laboriosam quis,",
			"price": 11.99,
			"posted": "2016-10-31",
			"contact": {
				"name": "Home Decor Guy",
				"phone": "(888) 888-8888",
				"email": "homedecorguy@gmail.com"
			},
			"categories": [
				"Home",
				"Decor"
			],
			"image": "./images/home/yellowpillow.jpg",
			"altname": "yellow pillow",
			"views": 170
		}, {
			"id": "12",
			"title": "Brown Table",
			"description": "The Brown table of the outdoor section offers you a very confortable moment, please check it out.",
			"price": 35.00,
			"posted": "2016-12-24",
			"contact": {
				"name": "Outdoor Signature",
				"phone": "(800) 555-6666",
				"email": "outdoorsignature@gmail.com"
			},
			"categories": [
				"Outdoor",
				"Decor"
			],
			"image": "./images/outdoor/browntable.jpg",
			"altname": "brown table",
			"views": 212
		}, {
			"id": "13",
			"title": "Occasional Bench",
			"description": "Best Bench in the market. This Woodstyle Bench is one of the most softly wood bench in Southern California.",
			"price": 125.00,
			"posted": "2016-09-20",
			"contact": {
				"name": "Outdoor Signature",
				"phone": "(800) 555-6666",
				"email": "outdoorsignature@gmail.com"
			},
			"categories": [
				"Outdoor",
				"Decor"
			],
			"image": "./images/outdoor/occasionalbench.jpg",
			"altname": "occasional bench",
			"views": 285
		}, {
			"id": "13",
			"title": "Sofa",
			"description": "Incredible confortable Sofa, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, unde dolorum deleniti totam, quam laudantium id nisi harum..",
			"price": 99.99,
			"posted": "2016-02-14",
			"contact": {
				"name": "Outdoor Signature",
				"phone": "(800) 555-6666",
				"email": "outdoorsignature@gmail.com"
			},
			"categories": [
				"Outdoor",
				"Decor"
			],
			"image": "./images/outdoor/sofa.jpg",
			"altname": "sofa",
			"views": 277
		}]
	}]);


})();