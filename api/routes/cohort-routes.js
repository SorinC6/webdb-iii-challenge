const express = require('express');
const knex = require('knex');

const cohortRoute = express.Router();

const knexConfig = require('../../knexfile').development;
const db = knex(knexConfig);

cohortRoute.get('/', async (req, res) => {
	try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
	} catch (error) {
		res.status(500).json({ error: 'Unable to perform this operation' });
	}
});

cohortRoute.get('/:id', async (req, res) => {
	try {
		const cohort = await db('cohorts').where({ id: req.params.id }).first();
		if (cohort) {
			res.status(200).json(cohort);
		} else {
			res.status(404).json({ message: "The specified id does't exists" });
		}
	} catch (error) {
		res.status(500).json({ error: 'There was a error trying to get the data' });
	}
});

cohortRoute.post('/', async (req, res) => {
	const body = req.body;
	if (body.name) {
		try {
			const [ result ] = await db('cohorts').insert(req.body);

			const cohort = await db('cohorts').where({ id: result }).first();

			res.status(201).json(cohort);
		} catch (error) {
			res.status(500).json({ error: 'There was a error tryng to save the data in database' });
		}
	} else {
		res.status(400).json({ error: 'Bad request' });
	}
});

cohortRoute.put('/:id', async (req, res) => {
	try {
		const result = await db('cohorts').where({ id: req.params.id }).update(req.body);
		if (result > 0) {
			const cohort = await db('cohorts').where({ id: req.params.id }).first();
			res.status(200).json(cohort);
		} else {
			res.status(404).json({ error: "The specified id does't exists" });
		}
	} catch (error) {
		res.status(500).json({ error: 'unable to update data' });
	}
});

cohortRoute.delete('/:id', async (req, res) => {
	try {
		const result = await db('cohorts').where({ id: req.params.id }).del();
		if (result > 0) {
			res.status(200).json({ message: 'Delete cohort succesfully' });
		} else {
			res.status(404).json({ error: 'Id not found for this cohort' });
		}
	} catch (error) {
		res.status(500).status({ error: 'There was a error trying to delete data' });
	}
});

//getting all stundets in a specified cohort

cohortRoute.get('/:id/students', async (req, res) => {
	try {
		const students = await db('students').where({ cohort_id: req.params.id });
		if (students.length) {
			res.status(200).json(students);
		} else {
			res.status(404).json({ message: 'the specified id Not Found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'tehre was a problem retriving the data' });
	}
});

module.exports = cohortRoute;
