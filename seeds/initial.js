
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
            username: 'ted',
            password: 'winter',
            first_name: 'Bill',
            last_name: 'Murray',
            email: 'bill.murray@email.com',
            image_url: 'http://fillmurray.com/100/100',
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
            image_url: 'http://fillmurray.com/100/100',
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

    // knex('projects').insert(
    //     {
    //         //id
    //         project_name: 'Hello World Project',
    //         image_url: '',
    //         //timestamps
    //         project_owner_id: 1,
    //         scrum_master_id: 2,
    //         company_id: 1,
    //         project_html: '<h1>Hello World!</h1>',
    //         project_css: 'h1{background:black;color:white;}',
    //         project_js: ''
    //     }
    // ),
    // knex('projects').insert(
    //     {
    //         //id
    //         project_name: 'Another Project',
    //         image_url: '',
    //         //timestamps
    //         project_owner_id: 2,
    //         scrum_master_id: 0,
    //         company_id: 2,
    //         project_html: '<h2>Our Test Project!</h2><div class="test"><h1>TESTING</h1></div>',
    //         project_css: '.test{background:blue;color:green;}',
    //         project_js: ''
    //     }
    // ),
    
   
   
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
    ),


    //--------User Project JOIN
    knex('userproject').insert(
        {
            //id - 1
            user_id: 1,
            project_id: 1
        }
    ),

    //--------User Company JOIN
    knex('usercompany').insert(
        {
            //id - 1
            user_id: 1,
            company_id: 1
        }
    ),

    //-------TRACKER
    knex('tracker').insert(
        {
            //id - 1
            project_id: 1,
            title: 'User has landing page',
            description: 'Allow users to have an introduction page for website',
            status: 'Started'
            
        }
    ),
    knex('tracker').insert(
        {
            //id - 1
            project_id: 1,
            title: 'User can upload pictures',
            description: 'Allow user to add an url or click to upload a picture',
            status: 'Not Started'
            
        }
    ),
    knex('tracker').insert(
        {
            //id - 1
            project_id: 1,
            title: 'User can update profile',
            description: 'allow user to update their settings, profile and companies they are associated with',
            status: 'Not Started'
            
        }
    ),


    //-----------NOTES
    knex('notes').insert(
        {
            //id - 1
            project_id: 1,
            user_id: 1,
            text: 'I think the header needs a different color'
            
        }
    ),
    knex('notes').insert(
        {
            //id - 1
            project_id: 1,
            user_id: 1,
            text: 'Can I get that in cornflower blue?'
            
        }
    ),
    knex('notes').insert(
        {
            //id - 1
            project_id: 1,
            user_id: 2,
            text: 'What font are you using?'
            
        }
    ),
     knex('notes').insert(
        {
            //id - 1
            project_id: 2,
            user_id: 2,
            text: 'Hero image needs to be bigger.'
            
        }
    )












    );
};











//END OF FILE