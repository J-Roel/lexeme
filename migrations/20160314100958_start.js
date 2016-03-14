
exports.up = function(knex, Promise) {
  return Promise.all([

        knex.schema.createTable('users', function(table){
            table.increments('id');
            table.string('username', 50);
            table.string('password', 50);
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

    ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('projects'),
      knex.schema.dropTable('companies')
  ])
};