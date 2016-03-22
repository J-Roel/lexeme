var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');



//---------------------------------
//USER AUTHENTICATION
//---------------------------------

router.post('/', function (req, res) {
	console.log("AUTHENTICATING USER");

	console.log(req.body);
	
	password = req.body.password;
	username = req.body.username;


	if(req.body.username){
		//Validate req.body.username and password against database
		knex('users').select().where('username', username)
		.then(function(data){


			// Load hash from your password DB.
			bcrypt.compare(password, data[0].password, function(err, resolve) {
		    	
		  		if(resolve){
					var profile = {
						id: data[0].id,
						username: data[0].username
						// first_name: data[0].first_name,
						// last_name: data[0].last_name,
						// email: data[0].email,
					 	//image_url: data[0].image_url,
					 	//auth_role: data[0].auth_role
					};

					// We are sending the profile inside the token
					var token = jwt.sign(profile, process.env.TOKEN_SECRET, { expiresInMinutes: 60*5 });

					res.json({ token: token});
		
				}//End resolve
				else{
					res.send(401, 'err')
				}
			});//end bcrypt

		
		}).catch(function(err){
			
			console.log('Sending 401 to Client');
		    res.send(401, 'Username was not found');
			next();

		});//END PROMISE
	} else { res.send(401, 'Username was not recieved'); }

});//END AUTHENTICATE




router.get('/restricted', function (req, res) {
  	console.log('IN RESTRICTED');


	console.log('user ' + req.user.username + ' is calling /restricted');

	res.json({
		name: 'foo'
	});


});







module.exports = router;











/* END OF FILE */