
exports.up = function(knex, Promise) {
  /*
  The knex.schema is a getter function, which returns a stateful object 
  containing the query. Therefore be sure to obtain a new instance 
  of the knex.schema for every query. These methods return promises.  
  */

 // createTable creates a new DB and takes `tableName` and callback as arguments
 // callback modifies the table's structure, using the schema-building commands.
  return knex.schema.createTable('cohorts', table => {
    // Adds an auto incrementing column. This will be used as the primary key for the table.
    table.increments();

    table
      .string('name', 128)
      .notNullable()

  });
  
};

exports.down = function(knex, Promise) {
  // Drops a table conditionally if the table exists, specified by tableName.
  return knex.schema.dropTableIfExists('cohorts');
};
