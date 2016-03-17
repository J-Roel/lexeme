


=====REGULAR TABLES======


|	USERS		|		|	PROJECTS				|	|	COMPANY 		|
|---------------|		|---------------------------|	|-------------------|
|	id 			|		|	id 						|	|	id 				|
|	username	|		|	project_name			|	|	company_name	|
|	password	|		|	image_url				|	|	image_url		|
|	first_name	|		|	project_created_date	|	|					|
|	last_name	|		|	project_owner_id		|
|	email		|		|	scrum_master_id			|
|	image_url	|		|	company_id				|
|	company_id	|		|	project_html			|
|	role 		|		|	project_css				|
|	auth_role	|		|	project_js				|
|				|		|							|



|	TRACKER			|
|-------------------|
|	id 				|
|	project_id 		|
|	start_date		|
|	finish_date		|
|	text			|
|	status			|
|					|



=====JOINS TABLES=======


|	USER-PROJECT	|		|	USER-COMPANY	|
|-------------------|		|-------------------|
|	id 				|		|	id 				|
|	user_id			|		|	user_id			|
|	project_id		|		|	company_id		|
|					|		|					|




