
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'WEB_EU1'},
        {name: 'DS_EU1'},
        {name: 'UX_EU1'}
      ]);
    });
};
