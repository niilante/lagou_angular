'use strict';

angular.module('app').controller('mainCtrl', ['$scope', function($scope) {
		$scope.list = [{
			id: '1',
			imageSrc: 'image/company-3.png',
			name: '销售',
			companyName: '千度',
			city: '上海',
			industry: '互联网',
			time: '2016-06-01 11:05'
		}, {
			id: '2',
			imageSrc: 'image/company-1.png',
			name: 'WEB前端',
			companyName: '慕课网',
			city: '北京',
			industry: '互联网',
			time: '2016-06-01 11:05'
		}];
}]);
