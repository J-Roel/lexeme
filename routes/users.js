var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');




//---------------------------------
//USER AUTHENTICATION
//---------------------------------

router.post('/authenticate', function (req, res) {


	//Bcrypt to take care of password
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
						id: data.id,
						username: data.username,
						first_name: data.first_name,
					    last_name: data.last_name,
					    email: data.email,
					    image_url: data.image_url,
					    company_id: data.company_id,
					    role: data.role,
					    auth_role: data.auth_role
					};

					// We are sending the profile inside the token
					var token = jwt.sign(profile, process.env.TOKEN_SECRET, { expiresInMinutes: 60*5 });

					res.json({ token: token });
		
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





//---------------------------------
//USER CRUD
//---------------------------------

//GET ALL USERS
router.get('/', function(req, res, next) {

	knex('users').select().then(function(data){
		res.send(data);
	}).catch(function(err){
		console.log("Error: ", err);
		res.send('There was an error on the server.');
	});

});


//GET INDIVIDUAL USER BY ID
router.get('/:id', function(req,res,next){

	knex('users').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});



//CREATE USER
router.post('/', function(req,res,next){


	console.log("USER: ", req.body);

    //id
	var username = req.body.username;
	var password = req.body.password;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var image_url = req.body.image_url;
	var company_id = req.body.company_id;
	var role = req.body.role;
	var auth_role = req.body.auth_role;

	
	//Setup password
	var passwordH;

	bcrypt.hash(password, 10, function(err, hash) {

			//Insert into database w/promise
			knex('users').insert({

				username : username,
				password : hash,
				first_name : first_name,
				last_name : last_name,
				email : email,
				image_url : image_url,
				company_id: company_id,
				role : role,
				auth_role: auth_role
			
			}).then(function(countInserted){

				res.send('Added new entry: ', countInserted);
			
			}).catch(function(err){
			
				res.send('There was an error posting to the server.');
			
			});//End Promise

	});//End Hash


});




//UPDATE USER
router.put('/:id', function(req,res,next){

    //id
	var username = req.body.username;
	var password = req.body.password;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var image_url = req.body.image_url;
	var company_id = req.body.company_id;
	var role = req.body.role;
	var auth_role = req.body.auth_role;

	//Validate on server side


	//Update database
	knex('users')
	.where('id', req.params.id)
	.update({

		username : username,
		password : password,
		first_name : first_name,
		last_name : last_name,
		email : email,
		image_url : image_url,
		company_id: company_id,
		role : role,
		auth_role: auth_role
	
	}).then(function(countInserted){
		//Confirm that we updated user
		res.send('Updated User');
	
	}).catch(function(err){
	
		res.send('Update did not succeed.');
	
	});


});



//DELETE USER
router.delete('/:id', function(req,res,next){

	// knex('accounts')
 //  	.where('activated', false)
 //  	.del()


	knex('users').where('id', req.params.id).del()
	.returning('id')
	.then(function(id){
		res.send(id , ' has been deleted.');

	}).catch(function(err){
		next();
	});

});





module.exports = router;











/* END OF FILE */