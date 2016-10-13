var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout){

	$scope.test = "test!"
//===================
// -- REGISTER --
//===================
	$scope.register = function(){
		$http.post(path + 'register_submit', {
			username: $scope.username,
			password: $scope.password,
			avatar: $scope.avatar
		}).then(function success(response){
			if(response.data == 'reg successful'){
				$scope.login();
				$('.dropdown.open .dropdown-toggle').dropdown('toggle');
			}
		})

	}
//===================
// -- LOGIN --
//===================
	$scope.login = function(){
		$http.post(path + 'login_submit', {
			username: $scope.username,
			password: $scope.password
		}).then(function successCallback(response){
			if (response.data){
				$scope.loggedIn = true;
				$scope.signedInAs = $scope.username;
				$cookies.put('username', $scope.username);
				$scope.avatar = response.data;
				$cookies.put('avatar', $scope.avatar)
			}
			getTrendingUsers();
			loadPosts();
		})
	}

})


janusApp.config(function($routeProvider){
	$routeProvider.when('/dash', {
		templateUrl: '/static/partials/dash.html',
		controller: 'mainController'
	})
})