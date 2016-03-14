var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//GET ALL COMPANIES
router.get('/', function(req, res, next) {

	knex('projects').select().then(function(data){
		res.send(data);
	}).catch(function(err){
		console.log("Error: ", err);
		res.send('There was an error on the server.');
	});

});


//GET INDIVIDUAL COMPANY
router.get('/:id', function(req,res,next){

	knex('projects').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});



//CREATE PROJECT
router.post('/', function(req,res,next){

    //id
	var project_name = req.body.project_name;
	var project_created_date = getDate(); //get the current date
	var project_owner_id = req.body.project_owner_id;
	var scrum_master_id = req.body.scrum_master_id;
	var company_id = req.body.company_id;
	var image_url = req.body.image_url;

	//TODO: gulp down to a minified version
	var project_html = req.body.project_html;

	var project_css = req.body.project_css;

	var project_js = req.body.project_js;


	


	//Validate on server side


	//Insert into database w/promise
	knex('projects').insert({

		project_name: project_name,

		image_url : image_url,
	
	}).then(function(countInserted){

		res.send('Added new entry: ', countInserted);
	
	}).catch(function(err){
	
		res.send('There was an error posting to the server.');
	
	});


});




// //UPDATE COMPANY
// router.put('/:id', function(req,res,next){

//     //id
// 	var company_name = req.body.company_name;
// 	var image_url = req.body.image_url;

// 	//Validate on server side


// 	//Update database
// 	knex('companies')
// 	.where('id', req.params.id)
// 	.update({

// 		company_name : company_name,
// 		image_url: image_url,
	
// 	}).then(function(countInserted){
// 		//Confirm that we updated user
// 		res.send('Updated User');
	
// 	}).catch(function(err){
	
// 		res.send('Update did not succeed.');
	
// 	});
// });




// //DELETE COMPANY
// router.delete('/:id', function(req,res,next){

// 	knex('companies').where('id', req.params.id).del()
// 	.then(function(success){
// 		res.send(success , ' has been deleted.');

// 	}).catch(function(err){
// 		next();
// 	});

// });








//HELPER FUNCTIONS
function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	return mm+'/'+dd+'/'+yyyy;

}





module.exports = router;











/* END OF FILE */