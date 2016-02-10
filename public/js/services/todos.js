angular.module('todoService', [])
	.factory('Todos', function($http){
		return {
			get: function(){
				return $http.get('/api');
			},
			create: function(todoData) {
				return $http.post('/api', todoData);
			},
			edit: function(todoData) {
				return $http.post('/api/update/' + todoData._id, todoData);
			},
			complete: function(id) {
				return $http.post('/api/complete/' + id);
			},
			reFocus: function(){
				return $http.get('/api/refocus');
			},
			delete: function(id) {
				return $http.post('/api/destroy/' + id);
			},
			focus: function(){ 
				return $http.get('/api/focus');
			},
			changeFocus: function(id){
				return $http.post('/api/focus/' + id);
			}			
		}
});