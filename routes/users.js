var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var passport = require('passport');


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
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req,res,next){


	knex('users').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});



//CREATE USER
router.post('/', passport.authenticate('jwt', { session: false}), function(req,res,next){

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