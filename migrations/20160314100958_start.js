
exports.up = function(knex, Promise) {
  return Promise.all([

        knex.schema.createTable('users', function(table){
            table.increments('id');
            table.string('username', 50);
            table.string('password');
            table.string('first_name', 50);
            table.string('last_name', 50);
            table.string('email', 120);
            table.string('image_url');
            table.integer('company_id');
            table.string('role', 50);
            table.string('auth_role',50);
        }),

        knex.schema.createTable('projects', function(table){
            table.increments('id');
            table.string('project_name');
            table.string('image_url');
            table.date('project_created_date');
            table.integer('project_owner_id');
            table.integer('scrum_master_id');
            table.integer('company_id');
            table.text('project_html');
            table.text('project_css');
            table.text('project_js');
        }),

        knex.schema.createTable('companies', function(table){
        	table.increments('id');
        	table.string('company_name');
            table.string('image_url');
        }),

         knex.schema.createTable('tracker', function(table){
            table.increments('id');
            table.integer('project_id');
            table.date('start_date');
            table.date('end_date');
            table.text('text');
            table.string('status', 20);
        }),

        knex.schema.createTable('userproject', function(table){
            table.increments('id');
            table.integer('user_id');
            table.integer('project_id');
        }),

        knex.schema.createTable('usercompany', function(table){
            table.increments('id');
            table.integer('user_id');
            table.string('company_id');
        })

    ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('projects'),
      knex.schema.dropTable('companies'),
       knex.schema.dropTable('tracker'),
      knex.schema.dropTable('userproject'),
      knex.schema.dropTable('usercompany')
  ])
};
