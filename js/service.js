angular.module('myApp.service', [])
  .factory('Contacts', ['$http', function($http) {

	return{

		getUsr : function(callback)
		{
			$http.get('/getUser')
			  .success(function(data){
			  	callback(data);
			  })
			  .error(function(data){

			  })
		},
	  	addUser : function(idUser,userName,phone,callback)
	  	{
	  		var tmp ={
                idName   : idUser,
                userName : userName,
                phoneUsr : phone
              }

              $http.get('/addUser',{params:tmp})
              	.success(function(data){
              		callback(data);
              	})
              	.error(function(data){
              		
              	});
	  	},
	  	editUser : function(result,callback)
	  	{
	  		$http.get('/editUser/'+result.idShw,{params:result})
			  .success(function(data){
			  	callback(data);
			  })
			  .error(function(data, status, headers, config){
			  	callback(status);
			  })
	  	}

	} 

  }]);