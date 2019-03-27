
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Jack'},
        {cohort_id: 3, name: 'Mike'},
        {cohort_id: 2, name: 'Larry'},
        {cohort_id: 2, name: 'Nancy'},
        {cohort_id: 1, name: 'Ema'},
        {cohort_id: 3, name: 'Joe'}
      ]);
    });
};
