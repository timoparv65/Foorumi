FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  // Toteuta kontrolleri tähän
  
  // alla omaa koodia. Viikko 7, tehtävä 51
  console.log("ShowTopicController");
  
  $scope.topic = {};
  $scope.messages = []; // Viikko 7, tehtävä 53
  $scope.messagesCount = 0; // Viikko 7, tehtävä 53
  $scope.newMessage = ""; // Viikko 7, tehtävä 53

  // id-polkuparametrin arvo
  console.log("$routeParams.id: " + $routeParams.id);
  Api.getTopic($routeParams.id)
    .success(function(data, status, headers, config){
        console.log('ShowTopicController/Api.getTopic: Palvelin lähetti vastauksen!');
        console.log(data);
        $scope.topic = data.topic;
        $scope.messages = $scope.topic.Messages; // Viikko 7, tehtävä 53
        $scope.messagesCount = $scope.messages.length;
    })
    .error(function(data, status, headers, config){
        console.log('ShowTopicController/Api.getTopic: Jotain meni pieleen...');
        console.log(data);
    });
  
  // Viikko 7, tehtävä 53
  $scope.addMessage = function(newMessage){
      console.log("ShowTopicController/addMessage");
      console.log("$scope.newMessage");
      console.log($scope.newMessage);
      Api.addMessage($scope.newMessage, $scope.topic.id)
            .success(function(data, status, headers, config){
                console.log('ShowTopicController/Api.addMessage: Palvelin lähetti vastauksen!');
                console.log(data);
                var path = '/messages/'.concat(data.id);
                console.log("path: " + path);
                $location.path(path);
            })
            .error(function(data, status, headers, config){
                console.log('ShowTopicController/Api.addMessage: Jotain meni pieleen...');
                console.log(data);
            });
  };

});
