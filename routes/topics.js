var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

/* ALKUPERÄINEN

// GET /topics
router.get('/', function(req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    res.send(200);
});

// GET /topics/:id
router.get('/:id', function(req, res, next) {
  // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
  var topicId = req.params.id;
  res.send(200); // alkuperäinen
});

// POST /topics
router.post('/', function(req, res, next) {
  // Lisää tämä aihealue
  var topicToAdd = req.body;
  // Palauta vastauksena lisätty aihealue
  res.send(200);
});

// POST /topics/:id/message
router.post('/:id/message', function(req, res, next) {
  // Lisää tällä id:llä varustettuun aihealueeseen...
  var topicId = req.params.id;
  // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var messageToAdd = req.body;
  // Palauta vastauksena lisätty viesti
  res.send(200);
});
*/


// Viikko 7, tehtävä 50

// GET /topics
router.get('/', function(req, res, next) {
    console.log("ROUTER: topic.js/router.get('/', function(req, res, next)");
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    Models.Topic.findAll().then(function(topics){
        console.log("VASTAUS: topic.js/Models.Topic.findAll()");
        console.log("topics");
        console.log(topics);
        res.send(topics);
    });
});

// GET /topics/:id
router.get('/:id', function(req, res, next) {
    console.log("ROUTER: topic.js/router.get('/:id', function(req, res, next)");
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    var topicId = req.params.id; // alkuperäinen
    console.log("topicId : " + topicId);
   
    Models.Topic.findOne({
           where: {id: topicId},
           include: {
               model: Models.Message,
               include: { // viikko 7, tehtävä 54
                   model: Models.User
               }
           }
    }).then(function(topic){
        console.log("VASTAUS: topic.js/Models.Topic.findOne(topicId)");
        console.log("topic");
        console.log({topic});
        res.send({topic}); // palautus JSON-objektina
    });
});

// POST /topics
//router.post('/', function(req, res, next) {
router.post('/', authentication, function(req, res, next) { // Viikko 7, tehtävä 54
    console.log("ROUTER: topic.js/router.post('/', function(req, res, next)");
    // Lisää tämä aihealue
    var topicToAdd = req.body;
    console.log("topicToAdd");
    console.log(topicToAdd);
    Models.Topic.create(topicToAdd).then(function(topic){
        console.log("VASTAUS: topic.js/Models.Topic.create(topicToAdd).then(function(topic)");
        console.log("topic");
        console.log(topic);
        // Palauta vastauksena lisätty aihealue
        res.send(topic);
    });
});

// POST /topics/:id/message
//router.post('/:id/message', function(req, res, next) {
router.post('/:id/message', authentication, function(req, res, next) { // Viikko 7, tehtävä 54
    console.log("ROUTER: topic.js/router.post('/:id/message', function(req, res, next)");
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    console.log("topicId: " + topicId);
    console.log("messageToAdd");
    console.log(messageToAdd);
    messageToAdd.TopicId = topicId;
    messageToAdd.UserId = req.session.userId; // viikko 7, tehtävä 54
    console.log("messageToAdd...2");
    console.log(messageToAdd);
    Models.Message.create(messageToAdd).then(function(message){
        console.log("VASTAUS: topic.js/Models.Message.create(messageToAdd).then(function(message)");
        console.log("message");
        console.log(message);
        // Palauta vastauksena lisätty viesti
        res.send(message);
    });
});

module.exports = router;
