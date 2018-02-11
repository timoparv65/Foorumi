FoorumApp.controller('UsersController', function($scope, $location, Api){
  // Toteuta kontrolleri tähän
  
  // Alla omaa koodia. Viikko 7, tehtävä 55
  //console.log("UsersController");
  
  $scope.errorMessage = "";
  
  $scope.register = function(){
      //console.log("UsersController/register");
      //console.log("$scope.newUser");
      //console.log($scope.newUser);
      Api.register($scope.newUser)
            .success(function(data, status, headers, config){
                console.log('UsersController/Api.register: Palvelin lähetti vastauksen!');
                //console.log('Kirjautuminen onnistui!');
                //console.log(data); // uusi käyttäjä
                $location.path("/"); // aihealueet listaavalle sivulle
            })
            .error(function(data, status, headers, config){
                console.log('UsersController/Api.register: Jotain meni pieleen...');
                //console.log('Kirjautuminen epäonnistui! Lisätään käyttäjälle virheilmoitus');
                //console.log(data);
                $scope.errorMessage = data.error;
            });
            
  };
  
  $scope.login = function(){
      //console.log("UsersController/login");
      //console.log("$scope.newUser");
      //console.log($scope.newUser);
      Api.login($scope.newUser)
      .success(function(data, status, headers, config){
                console.log('UsersController/Api.login: Palvelin lähetti vastauksen!');
                //console.log('Kirjautuminen onnistui!');
                //console.log(data); // käyttäjän tiedot
                $location.path("/"); // aihealueet listaavalle sivulle
            })
            .error(function(data, status, headers, config){
                console.log('UsersController/Api.login: Jotain meni pieleen...');
                //console.log('Kirjautuminen epäonnistui! Lisätään käyttäjälle virheilmoitus');
                //console.log(data);
                $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
            });
  };
  
});
