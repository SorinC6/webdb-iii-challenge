exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cohorts').del().then(function() {
		// Inserts seed entries
		return knex('cohorts').insert([
			{ name: 'name test1' },
			{ name: 'name test2' },
			{ name: 'name test3' }
		]);
	});
};
