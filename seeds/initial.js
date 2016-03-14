
exports.seed = function(knex, Promise) {
  return Promise.join(
    
    // Deletes ALL existing entries
    knex('users').del(),
    knex('projects').del(),
    knex('companies').del(),

    // Inserts seed entries


    //-----------USER
    knex('users').insert(
        {
            //id
            username: 'John',
            password: 'password',
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@email.com',
            image_url: 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg',
            company_id: 1,
            role: 'Owner',
            auth_role: 'author'
        }
    ),
    knex('users').insert(
        {
            //id
            username: 'Sam',  
            password: 'another',
            first_name: 'Sam',
            last_name: 'TheDog',
            email: 'sam.dog@yahoo.com',
            image_url: 'http://www.permanentmakeup-london.co.uk/images/diffeyebrows/perfect-shaped-brows-for-this-face-yours-will-be-created-to-suit-you.jpg',
            company_id: 1,
            role: 'Project Manager',
            auth_role: 'author',
        }
    ),
    knex('users').insert(
        {
            //id
            username: 'Lucy',  
            password: 'inthesky',
            first_name: 'Lucy',
            last_name: 'Diamond',
            email: 'lucysky@hotmail.com',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7mJp_uLlE0FraW39aRkJnWD6QxG9Aw4EOWoYQwMdmKH7I9JdIg',
            company_id: 2,
            role: 'CEO',
            auth_role: 'author'
        }
    ),
   
    

    //-------PROJECTS

    knex('projects').insert(
        {
            //id
            project_name: 'Hello World Project',
            image_url: '',
            project_created_date: '1/1/16',
            project_owner_id: 1,
            scrum_master_id: 2,
            company_id: 1,
            project_html: '<h1>Hello World!</h1>',
            project_css: 'h1{background:black;color:white;}',
            project_js: ''
        }
    ),
    knex('projects').insert(
        {
            //id
            project_name: 'Another Project',
            image_url: '',
            project_created_date: '3/5/16',
            project_owner_id: 2,
            scrum_master_id: 0,
            company_id: 2,
            project_html: '<h2>Our Test Project!</h2><div class="test"><h1>TESTING</h1></div>',
            project_css: '.test{background:blue;color:green;}',
            project_js: ''
        }
    ),
    
   
   
    //-------COMPANIES
    knex('companies').insert(
        {
            //id - 1 
            company_name: 'Test Company',
            image_url: 'http://brandongaille.com/wp-content/uploads/2013/07/Dell-Company-Logo.jpg'

        }
    ),
    knex('companies').insert(
        {
            //id - 2
            company_name: 'Lucy\'s Company',
            image_url: 'http://brandongaille.com/wp-content/uploads/2013/07/IBM-Company-Logo.jpg'
        }
    )

    );
};











//END OF FILE