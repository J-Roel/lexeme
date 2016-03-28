var express = require('express');
var router = express.Router();
var knex = require('../db/knex');



//GET INDIVIDUAL USER BY TOKEN
router.get('/', function(req,res,next){

	//Leave if we don't have user id
	if(!req.user.id){
		next();
	}

	var userId = req.user.id;

	knex('tracker').select().where('user_id', userId)
	.then(function(data){
		console.log('Trackers: ', data);
		res.send(data);

	}).catch(function(err){
		next();
	});

});




//CREATE TRACKER
router.post('/', function(req,res,next){

  	console.log('In POST /tracker/  -> ', req.body);
		var list_id = req.body.list_id;
        var project_id = req.body.project_id;
        var project_name = req.body.project_name;
        var user_id = req.body.user_id;
        var title = req.body.name;
        var task = "";
        var status = "";



	//Insert into database w/promise
	knex('tracker').insert({
		//id is automatic
		list_id: list_id,
        project_id: project_id,
        project_name: project_name,
        user_id: user_id,
        title: title,
     	//timestamps is automatic
        task: task,
        status: status
	
	}).returning('id').then(function(newId){
		console.log("Successfully added a tracker.");
		res.send('Added new entry: ', newId);
	
	}).catch(function(err){

		console.log('There was an error posting to the server.');
		console.log('------------------------------------------');
		console.log('\t\tERROR');
		console.log('-------------------------------------start');
		console.log(err);
		console.log('---------------------------------------end');



		res.send('There was an error posting to the server.');
	
	});


});


//CREATE TRACKER
router.put('/update/:id', function(req,res,next){

	var thisId = req.params.id;

  	console.log('In POST /tracker/  -> ', req.params.id, req.body);
        var task = req.body.task;
        var status = req.body.status;



	//Insert into database w/promise
	knex('tracker')
		.where('id', thisId)
		.update({
     		//timestamps is automatic
        	task: task,
        	status: status
	}).then(function(countInserted){
		console.log("Successfully Updated a tracker.");
		res.send('Updated: ', countInserted);
	
	}).catch(function(err){

		console.log('There was an error updating tracker.');
		console.log('------------------------------------------');
		console.log('\t\tERROR');
		console.log('-------------------------------------start');
		console.log(err);
		console.log('---------------------------------------end');



		res.send('There was an error posting to the server.');
	
	});


});



//DELETE TRACKER
router.delete('/:id', function(req,res,next){
	console.log("Server - Removing Tracker: ", req.params.id);
	// knex('accounts')
 //  	.where('activated', false)
 //  	.del()


	knex('tracker').where('id', req.params.id).del()
	.returning('id')
	.then(function(id){
		res.send(id , ' has been deleted.');

	}).catch(function(err){
		next();
	});

});






module.exports = router;











/* END OF FILE */