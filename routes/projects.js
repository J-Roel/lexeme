var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//GET ALL PROJECTS
router.get('/', function(req, res, next) {

	knex('projects').select().then(function(data){
		res.send(data);
	}).catch(function(err){
		console.log("Error: ", err);
		res.send('There was an error on the server.');
	});

});


//GET ALL PROJECTS OF A USER
router.get('/userProjects', function(req, res, next) {

	//Leave if we don't have a token
	// if(!req.user.id){
	// 	next();
	// }

	var userId = req.user.id;

	knex('users')
	.join('userproject', userId, '=', 'userproject.user_id')
	.join('projects', 'projects.id', '=', 'userproject.project_id')
	.where('users.id', userId)
	.select('projects.*')


	.then(function(response){
		//console.log(response);
		res.send(response)
	}).catch(function(err){
		console.log("ERROR: ", err);
	})


});







//GET INDIVIDUAL PROJECT BY ID
router.get('/:id', function(req,res,next){

	knex('projects').select().where('id', req.params.id)
	.then(function(data){
		res.send(data);

	}).catch(function(err){
		next();
	});

});



//CREATE PROJECT BASED ON TOKEN
router.post('/', function(req,res,next){

	if(!req.user.id){
		next();
	}

    //id
	var project_name = req.body.project_name;
	var image_url = req.body.image_url;
	var project_owner_id = req.body.project_owner_id;
	var scrum_master_id = req.body.scrum_master_id;
	var company_id = req.body.company_id;
	var project_html = req.body.project_html;
	var project_css = req.body.project_css;
	var project_js = req.body.project_js;


	//Validate on server side

	var userId = parseInt(req.user.id);
	console.log("USERID: ", userId)

	//Insert into database w/promise
	knex('projects').insert({
		
		project_name: project_name,
		image_url : image_url,
		project_owner_id: project_owner_id,
		scrum_master_id: scrum_master_id,
		company_id: company_id,
		project_html: project_html,
		project_css: project_css,
		project_js:  project_js

	}).returning('id') //return our info
	.then(function(newProjectID){
		
		console.log('New id: ', newProjectID[0] )
		
		//Next insert our project 
		knex('userproject').insert({
		
			user_id: userId,
			project_id: newProjectID[0]
		
		}).then(function(){
			console.log('-----ADDED JOIN TABLE ENTRY-----')	
			//Everything was good, let client know
			res.send('New Project Created Successfully');
		
		})
	
	}).catch(function(err){
		//ERROR so send a message back to client
		next();
	
	});


});



//--------------------------NOTES FOR PROJECTS


//GET ALL NOTES
router.get('/notes', function(req, res, next) {

	knex('notes').select().where('user_id', req.user.id )
	.then(function(data){
		console.log(data);
		res.send(data);
	}).catch(function(err){
		console.log("Error: ", err);
		res.send('There was an error on the server.');
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