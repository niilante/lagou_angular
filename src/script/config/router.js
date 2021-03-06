angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	'use strict';

	$stateProvider.state('main', {
		// 配置路由路径，模版，控制器
		url: '/main',
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
	}).state('position', {
		url: '/position/:id',
		templateUrl: 'view/position.html',
		controller: 'positionCtrl'
	});
	$urlRouterProvider.otherwise('main');
}]);