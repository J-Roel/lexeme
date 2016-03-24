var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');




//---------------------------------
//USER CRUD
//---------------------------------

//GET ALL USERS
// router.get('/', function(req, res, next) {

// 	knex('users').select().then(function(data){
// 		res.send(data);
// 	}).catch(function(err){
// 		console.log("Error: ", err);
// 		res.send('There was an error on the server.');
// 	});

// });


//GET INDIVIDUAL USER BY ID
router.get('/:id', function(req,res,next){

	knex('users').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});


//GET INDIVIDUAL USER BY TOKEN
router.get('/userByToken', function(req,res,next){

	//Jump ship if we don't have any info
	//this route is jwt protected, but
	//I like taking the extra step
	if(!req.user.id){
		next();
	}

	var userId = req.user.id;

	knex('users').select().where('id', userId)
	.then(function(data){
		//console.log('USER FROM API: ', data);
		res.send(data);

	}).catch(function(err){
		next();
	});

});





//CREATE USER
router.post('/', function(req,res,next){


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
router.put('/update', function(req,res,next){

	console.log('--------------------');

	if(!req.user.id){
		next();
	}

	var userId = req.user.id;
	console.log('USER INFO: ', req.body);

    //id
	var username = req.body.username;
	var password = password;
	var first_name = req.body.firstname;
	var last_name = req.body.lastname;
	var email = req.body.email;
	var image_url = req.body.imageurl;

	var company_id = req.body.company_id;
	
	var role = req.body.role;
	
	if(req.body.auth_role){
		var auth_role = req.body.auth_role;
	} else {
		var auth_role = 'author';
	}


	if(req.body.password){

	//Setup password
	var passwordH;

	bcrypt.hash(password, 10, function(err, hash) {

			//Update database
		knex('users')
		.where('id', userId)
		.update({
			username : username,
			password : passwordH,
			first_name : first_name,
			last_name : last_name,
			email : email,
			image_url : image_url,
			company_id: company_id,
			role : role,
			auth_role: auth_role
		}).then(function(countInserted){
			//Confirm that we updated user
			res.send('Update Successful!', countInserted);
		}).catch(function(err){
			res.send('Update did not succeed.');
		});

	});//End Hash

} else {

	//Update database
		knex('users')
		.where('id', userId)
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
			res.send('Update Successful!', countInserted);
		}).catch(function(err){
			res.send('Update did not succeed.');
		});



}



	


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