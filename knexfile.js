// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'lexeme',
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'lexeme_knex_migrations'
    }
  }

};
