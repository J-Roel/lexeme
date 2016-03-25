var express = require('express');
var router = express.Router();
var knex = require('../db/knex');



//CREATE TRACKER
router.post('/', function(req,res,next){

  	console.log('In POST /tracker/  -> ', req.body);

		var list_id = req.body.newListNum;
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
	
	}).then(function(countInserted){
		console.log("Successfully added a tracker.");
		res.send('Added new entry: ', countInserted);
	
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












module.exports = router;











/* END OF FILE */