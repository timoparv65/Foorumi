var authentication = function(req, res, next){
  // Tarkista, että käyttäjä on kirjautunut tässä
  
  // alla omaa koodia, Viikko 7, tehtävä 54
  //console.log("authentication");
  
  if (!req.session.userId || req.session.userId == null) {
      console.log("autentikaatio epäonnistui");
      res.send(403);
  }else{
      console.log("autentikaatio onnistui");
      next();
  }
}

module.exports = authentication;
