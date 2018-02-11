FoorumApp.service('Api', function($http){
    
  //console.log("Api");
    
  // Aihealueiden Api-funktiot
  this.getTopics = function(){
    // Hae kaikki aihealueet toteuttamasi Api:n polusta /topics
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/getTopics");
    return $http.get("/topics");
  };
  this.getTopic = function(id){
    // Hae annetulla id:llä varastettu aihealue toteuttamasi Api:n polusta /topics/:id
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/getTopic");
    var address = "/topics/" + id;
    //console.log("address: " + address);
    return $http.get(address);
  };
  this.addTopic = function(topic){
    // Lisää annettu aihealue lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /topics
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/addTopic");
    //console.log("topic");
    //console.log(topic);
    return $http.post("/topics", {name: topic.name, description: topic.description});
  };

  // Viestien Api-funktiot
  this.getMessage = function(id){
    // Hae annetulla id:llä varustettu viesti toteuttamasi Api:n polusta /messages/:id
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/getMessage");
    var address = "/messages/" + id;
    //console.log("address: " + address);
    return $http.get(address);
  };
  this.addMessage = function(message, topicId){
    // Lisää annettu viesti lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /topics/:topicId/message
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/addMessage");
    console.log("topicId: " + topicId);
    console.log("message");
    console.log(message);
    var address = "/topics/" + topicId + "/message";
    console.log("address: " + address);
    return $http.post(address, {title: message.title, content: message.content});
  };

  // Vastausten Api-funktiot
  this.addReply = function(reply, messageId){
    // Lisää annettu vastaus lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /messages/:messageId/reply
    
    // alla omaa koodia. Viikko 7, tehtävä 51
    console.log("Api/addReply");
    console.log("messageId: " + messageId);
    console.log("reply");
    console.log(reply);
    var address = "/messages/" + messageId + "/reply";
    console.log("address: " + address);
    return $http.post(address, {content: reply});
  };

  // Käyttäjän Api-funktiot
  this.login = function(user){
    // Tarkista käyttäjän kirjautuminen lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users/authenticate
    
    // alla omaa koodia. Viikko 7, tehtävä 55
    console.log("Api/login");
    //console.log("user");
    //console.log(user);
    //return $http.post("/users/authenticate", {username: user.username, password: user.password});
    return $http.post("/users/authenticate", user);
  }
  this.register = function(user){
    // Lisää annettu käyttäjä lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users
    
    // alla omaa koodia. Viikko 7, tehtävä 55
    console.log("Api/register");
    //console.log("user");
    //console.log(user);
    return $http.post("/users", user);
  }
  this.getUserLoggedIn = function(){
    // Hae kirjautunut käyttäjä toteuttamasi Api:n polusta /users/logged-in
    
    // alla omaa koodia. Viikko 7, tehtävä 55
    console.log("Api/getUserLoggedIn");
    return $http.get("/users/logged-in");
  }
  this.logout = function(){
    console.log("Api/logout");
    return $http.get('/users/logout');
  }
});
