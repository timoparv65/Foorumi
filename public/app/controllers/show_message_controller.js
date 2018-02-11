FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
  // Toteuta kontrolleri tähän
  
  // alla omaa koodia. Viikko 7, tehtävä 53
  console.log("ShowMessageController");
  
  $scope.message = {};
  $scope.replies = [];
  $scope.repliesCount = 0;
  $scope.newReply = "";
  
  // id-polkuparametrin arvo
  //console.log("$routeParams.id: " + $routeParams.id);
  Api.getMessage($routeParams.id)
    .success(function(data, status, headers, config){
        console.log('ShowMessageController/Api.getMessage: Palvelin lähetti vastauksen!');
        //console.log(data);
        $scope.message = data.message;
        $scope.replies = $scope.message.Replies;
        $scope.repliesCount = $scope.replies.length;
    })
    .error(function(data, status, headers, config){
        console.log('ShowMessageController/Api.getMessage: Jotain meni pieleen...');
        //console.log(data);
    });
    
  $scope.addReply = function(){
      console.log("ShowMessageController/addReply");
      console.log("$scope.message.id: " + $scope.message.id);
      console.log("$scope.newReply");
      console.log($scope.newReply);
      
      Api.addReply($scope.newReply, $scope.message.id)
            .success(function(data, status, headers, config){
                console.log('ShowMessageController/Api.addReply: Palvelin lähetti vastauksen!');
                //console.log(data);
            })
            .error(function(data, status, headers, config){
                console.log('ShowMessageController/Api.addReply: Jotain meni pieleen...');
                //console.log(data);
            });
  };
});
