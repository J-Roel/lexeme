var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


var jwt = require('jsonwebtoken');



router.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'John' && req.body.password === 'password')) {
    res.send(401, 'Wrong user or password');
    return;
  }



  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
});


router.get('/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /restricted');
  res.json({
    name: 'foo'
  });
});


module.exports = router;











//END OF FILE