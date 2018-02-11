var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

/* ALKUPERÄINEN
// POST /users
router.post('/', function(req, res, next){
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  // Palauta vastauksena lisätty käyttäjä
  res.send(200);
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  res.send(200);
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  var loggedInId = req.session.userId ? req.session.userId : null;

  if(loggedInId == null){
    res.json({});
  }else{
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
  }

  res.send(200);
});

// GET /users/logout
router.get('/logout', function(req, res, next){
  req.session.userId = null;

  res.send(200);
});
*/

// Viikko 7, tehtävä 54

// POST /users
router.post('/', function(req, res, next){
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  
  // alla omaa koodia
  console.log("ROUTER: user.js/router.post('/', function(req, res, next)");
  console.log("userToAdd");
  console.log(userToAdd);
  
  if(userToAdd == null || userToAdd.username == null || userToAdd.password == null){
    console.log("käyttäjänimi tai salasana (tai molemmat) tyhjiä");
    res.send(403).json({error: 'käyttäjänimi tai salasana (tai molemmat) tyhjiä'});
  }
  
  Models.User.findOne({
      where: {
          username: userToAdd.username,
          password: userToAdd.password
      }
  }).then(function(user){
      console.log("VASTAUS: Models.User.findOne(...).then(function(user)");
      console.log("user");
      console.log(user);
      if(user){
          console.log("Käyttäjätunnus on jo käytössä!");
          res.status(403).json({error: 'Käyttäjätunnus on jo käytössä!'});
      }else{
          Models.User.create(userToAdd).then(function(user2){
                console.log("VASTAUS: Models.Usercreate(userToAdd).then(function(user2)");
                console.log("user2");
                console.log(user2);
                // Palauta vastauksena lisätty käyttäjä
                res.send(user2);
          });
      }
  });
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  
  // alla omaa koodia
  console.log("ROUTER: user.js/router.post('/authenticate', function(req, res, next)");
  console.log("userToCheck");
  console.log(userToCheck);
  
  if(userToCheck == null || userToCheck.username == null || userToCheck.password == null){
    console.log("käyttäjänimi tai salasana (tai molemmat) tyhjiä");
    res.send(403).json({error: 'käyttäjänimi tai salasana (tai molemmat) tyhjiä'});
  }
  
  Models.User.findOne({
    where: {
      username: userToCheck.username,
      password: userToCheck.password
    }
  }).then(function(user){
      console.log("VASTAUS: Models.User.findOne(...).then(function(user)");
      console.log("user");
      console.log(user);
      if(user){
          console.log("talletetaan: req.session.userId = user.id");
          req.session.userId = user.id;
          res.json(user);
      }else{
          console.log("Käyttäjätunnusta ei ole olemassa!!");
          res.send(400).json({error: 'Väärä käyttäjätunnus tai salasana!'});
      }
  });
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  console.log("ROUTER: user.js/router.get('/logged-in', function(req, res, next)");
  var loggedInId = req.session.userId ? req.session.userId : null;
  console.log("loggedInId");
  console.log(loggedInId);

  if(loggedInId == null){
    // alla omaa koodia
    console.log("Käyttäjä ei ole kirjautunut");
    res.status(400).json({error: 'Käyttäjä ei ole kirjautunut'});
  }else{
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
    
    // alla omaa koodia
    Models.User.findOne({
        where: {id: loggedInId}
    }).then(function(user){
        console.log("VASTAUS: Models.User.findOne(...).then(function(user)");
        console.log("user");
        console.log(user);
        if(user){
            console.log("lähetettiin vastaus {user}");
            res.json(user);
        }else{
            console.log("Käyttäjätunnusta ei ole olemassa!");
            res.send(400).json({error: 'Käyttäjätunnusta ei ole olemassa!'});
        }
    });
  }

});

// GET /users/logout
router.get('/logout', function(req, res, next){
  console.log("ROUTER: user.js/router.get('/logout', function(req, res, next)");
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
