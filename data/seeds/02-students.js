exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').del().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ name: 'Alin', cohort_id: 1 },
			{ name: 'Jerry', cohort_id: 2 },
			{ name: 'Maria', cohort_id: 1 }
		]);
	});
};
