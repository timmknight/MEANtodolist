angular.module('todoController', [])

.controller('MainController', ['$scope', '$http', '$location', 'Todos', function ($scope, $http, $location, Todos) {
	$scope.formData = {};

	$scope.editedTodo = null;
$scope.focusing = false;


	Todos.get()
		.success(function(data) {
			$scope.todos = data;
				console.log(data);
		});

	$scope.createTodo = function() {

		if(!$.isEmptyObject($scope.formData)){
			Todos.create($scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				// console.log(data);
			})
		}
	};

	$scope.editTodo = function(id) {
		Todos.edit(id, $scope.text)
		.success(function(data){
			// $scope.formData = {};
			$scope.todos = data;
		});
	};

	$scope.completeTodo = function(id) {
		console.log($scope.focusing);
		Todos.complete(id)
		.success(function(data) {
			$scope.todos = data;
		});
	};

// 	$scope.reFocus = function(){
// 		// Todos.get()
// 		// 	.success(function(data) {
// 		// 		$scope.todos = data;
// 		// });
// $location.path('/api');
// 	};	

	$scope.revertEdits = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.editedTodo = null;
			$scope.originalTodo = null;
			$scope.reverted = true;
		};

	$scope.deleteTodo = function(id) {
		Todos.delete(id)
		.success(function(data) {
			$scope.todos = data;
		});
	};

	$scope.focusTodo = function() {
		$scope.focusing = true;

		Todos.focus()
		.success(function(data) {
			console.log("Data");	
			console.log(data);
			$scope.focusTodos = data;
		});
	};

	$scope.reFocus = function(){
		$scope.focusing = false;
	};

	$scope.changeTodoFocus = function(id) {
		Todos.changeFocus(id)
		.success(function(data) {
			$scope.focusTodos = data;
		});
	};
}]);