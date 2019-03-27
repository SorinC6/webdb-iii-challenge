
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.increments();

    table
      .string('name', 128)
      .notNull();

    table
      .integer('cohort_id')
//Signedness is a property of data types representing numbers in computer programs. 
// A numeric variable is signed if it can represent both positive and negative numbers,
// and unsigned if it can only represent non-negative numbers.
      .unsigned()
// Sets the "column" that the current column references as a foreign key.
      .references('id')
// Sets the "table" where the foreign key column is located after calling column.references.
      .inTable('cohorts')
// Sets the SQL command to be run "onDelete" and "onUpdate".
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
// A foreign key with CASCADE delete means that if a record in the parent table
// is deleted, then the corresponding records in the child table will automatically be deleted.


    table.timestamps(true, true);  // automatically creates timestamps
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
