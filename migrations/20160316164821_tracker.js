
exports.up = function(knex, Promise) {
  return Promise.all([

        knex.schema.createTable('tracker', function(table){
            table.increments('id');
            table.integer('project_id');
            table.date('start_date');
            table.date('end_date');
            table.text('text');
            table.string('status', 20);
        }),

        knex.schema.createTable('user-project', function(table){
            table.increments('id');
            table.integer('user_id');
            table.integer('project_id');
        }),

        knex.schema.createTable('user-company', function(table){
            table.increments('id');
            table.integer('user_id');
            table.string('company_id');
        })

    ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
      knex.schema.dropTable('tracker'),
      knex.schema.dropTable('user-project'),
      knex.schema.dropTable('user-company')
  ])
};
