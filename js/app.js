 var myApp = angular.module('myApp', ['ui.router','myApp.service']);
        myApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");
  
        $stateProvider
          .state('home',{
            url: "/home",
            templateUrl: "./home.html"

           })
          .state('list', {
            parent: 'home',
            templateUrl: './product.html'
          })
          .state('home.sss',{
            url: "",
            views : {
            }
          })
          .state('about',{
            url : "/about",
            templateUrl: "./about.html"
          })
          .state('contact',{
            url : "/contact",
            templateUrl: "./contact.html"
          })
          .state('contact.detail',{
            url: '/detail/:ID',
            templateUrl: "./contact.detail.html",
            controller: function($scope, $stateParams) {

              $scope.result={};

              for (var i = 0; i < $scope.usrData.length; i++) {
                if ($scope.usrData[i].idUsr==$stateParams.ID)
                 {
                  $scope.result.idShw = $scope.usrData[i].idUsr;
                  $scope.result.nameShw = $scope.usrData[i].nameUsr;
                  $scope.result.phoneShw = $scope.usrData[i].phoneUsr;
                 }
              };

              $scope.idTest = $stateParams.ID;
              console.log($scope.idTest);
             }
          });
         
      });

        myApp.controller('addContact', ['$scope','Contacts', function($scope,Contacts) {
          
            $scope.dataUsers=[];

            Contacts.getUsr(function(data){
                $scope.usrData=data;
            });
           

            $scope.addUser=function(idUser,userName,phone)
            {

              Contacts.addUser(idUser,userName,phone,function(data){
                 Contacts.getUsr(function(data){
                   $scope.usrData=data;
                 });
              });

            }

            $scope.editUser=function(result)
            {
             Contacts.editUser(result,function(data){
                 Contacts.getUsr(function(data){
                   $scope.usrData=data;
                 });
              });
            
            }

         }]);