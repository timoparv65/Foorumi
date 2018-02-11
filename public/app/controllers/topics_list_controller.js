FoorumApp.controller('TopicsListController', function($scope, $location, Api){
  // Toteuta kontrolleri tähän
  
  // alla omaa koodia. Viikko 7, tehtävä 51
  console.log("TopicsListController");
  
  $scope.topics = [];
  $scope.newTopic = "";
  
  Api.getTopics()
    .success(function(data, status, headers, config){
        console.log('TopicsListController/Api.getTopics: Palvelin lähetti vastauksen!');
        console.log(data);
        $scope.topics = data;
    })
    .error(function(data, status, headers, config){
        console.log('TopicsListController/Api.getTopics: Jotain meni pieleen...');
        console.log(data);
    });
    
   $scope.addTopic = function(){
       console.log("TopicsListController/addTopic");
       Api.addTopic($scope.newTopic)
            .success(function(data, status, headers, config){
                console.log('TopicsListController/Api.addTopic: Palvelin lähetti vastauksen!');
                console.log(data);
                var path = '/topics/'.concat(data.id);
                console.log("path: " + path);
                $location.path(path);
            })
            .error(function(data, status, headers, config){
                console.log('TopicsListController/Api.addTopic: Jotain meni pieleen...');
                console.log(data);
            });
   };
});
