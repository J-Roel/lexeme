var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');





//---------------------------------
//USER AUTHENTICATION
//---------------------------------

router.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401

  console.log(req.body);

  if (!(req.body.username === 'john' && req.body.password === 'password')) {

	    console.log('Sending 401 to Client');
	    res.send(401, 'Wrong user or password');
	    return;


  	} else {


  		console.log('Username and password correct');

		var profile = {
			first_name: 'John',
		    last_name: 'Doe',
		    email: 'john@doe.com',
		    id: 123
		};

		// We are sending the profile inside the token
		var token = jwt.sign(profile, process.env.TOKEN_SECRET, { expiresInMinutes: 60*5 });

		res.json({ token: token });
	}
});


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


//GET INDIVIDUAL USER
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

	console.log("USER: ", req.user);

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


	//Insert into database w/promise
	knex('users').insert({

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

		res.send('Added new entry: ', countInserted);
	
	}).catch(function(err){
	
		res.send('There was an error posting to the server.');
	
	});


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