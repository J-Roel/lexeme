var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//GET ALL COMPANIES
router.get('/', function(req, res, next) {

	knex('companies').select().then(function(data){
		res.send(data);
	}).catch(function(err){
		console.log("Error: ", err);
		res.send('There was an error on the server.');
	});

});


//GET INDIVIDUAL COMPANY
router.get('/:id', function(req,res,next){


	knex('companies').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});



//CREATE COMPANY
router.post('/', function(req,res,next){

    //id
	var company_name = req.body.company_name;
	var image_url = req.body.image_url;

	//Validate on server side


	//Insert into database w/promise
	knex('companies').insert({

		company_name: company_name,
		image_url : image_url,
	
	}).then(function(countInserted){

		res.send('Added new entry: ', countInserted);
	
	}).catch(function(err){
	
		res.send('There was an error posting to the server.');
	
	});


});




//UPDATE COMPANY
router.put('/:id', function(req,res,next){

    //id
	var company_name = req.body.company_name;
	var image_url = req.body.image_url;

	//Validate on server side


	//Update database
	knex('companies')
	.where('id', req.params.id)
	.update({

		company_name : company_name,
		image_url: image_url,
	
	}).then(function(countInserted){
		//Confirm that we updated user
		res.send('Updated User');
	
	}).catch(function(err){
	
		res.send('Update did not succeed.');
	
	});
});




//DELETE COMPANY
router.delete('/:id', function(req,res,next){

	knex('companies').where('id', req.params.id).del()
	.then(function(success){
		res.send(success , ' has been deleted.');

	}).catch(function(err){
		next();
	});

});
















module.exports = router;











/* END OF FILE */