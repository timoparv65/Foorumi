var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

/* ALKUPERÄINEN
// GET /messages/:id
router.get('/:id', function(req, res, next) {
  // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
  var messageId = req.params.id;
  res.send(200);
});

// POST /messages/:id/reply
router.post('/:id/reply', function(req, res, next){
  // Lisää tällä id:llä varustettuun viestiin...
  var messageId = req.params.id;
  // ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var replyToAdd = req.body;
  // Palauta vastauksena lisätty vastaus
  res.send(200);
});
*/

// Viikko 7, tehtävä 52

// GET /messages/:id
router.get('/:id', function(req, res, next) {
  // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
  
  // alla omaa koodia
  var messageId = req.params.id;
  console.log("ROUTER: messages.js/router.get('/:id', function(req, res, next)");
  console.log("messageId: " + messageId);
  
  Models.Message.findOne(
    {
        where: {id: messageId},
        include: {
            model: Models.Reply,
            include: { // viikko 7, tehtävä 54
                model: Models.User
            }
        }
    }).then(function(message){
        console.log("VASTAUS: messages.js/Models.Message.findOne(...).then(function(message)");
        console.log("message");
        console.log({message});
        res.send({message});
    });
});

// POST /messages/:id/reply
//router.post('/:id/reply', function(req, res, next){
router.post('/:id/reply', authentication, function(req, res, next){  // Viikko 7, tehtävä 54
  // Lisää tällä id:llä varustettuun viestiin...
  var messageId = req.params.id;
  // ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var replyToAdd = req.body;
  
  // alla omaa koodia
  console.log("ROUTER: messages.js/router.post('/:id/reply', function(req, res, next)");
  console.log("messageId: " + messageId);
  console.log("replyToAdd");
  console.log(replyToAdd);
  replyToAdd.MessageId = messageId;
  replyToAdd.UserId = req.session.userId; // viikko 7, tehtävä 54
  console.log("replyToAdd...2");
  console.log(replyToAdd);
  
  Models.Reply.create(replyToAdd).then(function(reply){
      console.log("VASTAUS: Models.Reply.create(replyToAdd).then(function(reply)");
      console.log("reply");
      console.log(reply);
      // Palauta vastauksena lisätty viesti
      res.send(reply);
  });
});

module.exports = router;
