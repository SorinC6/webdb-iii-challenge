const express = require('express');
const knex = require('knex');

const studentsRoute = express.Router();

const knexConfig = require('../../knexfile').development;
const db = knex(knexConfig);

studentsRoute.get('/', async (req, res) => {
	try {
		const students = await db('students');
		res.status(200).json(students);
	} catch (error) {
		res.status(500).json({ error: 'Unable to perform this operation' });
	}
});

studentsRoute.get('/:id', async (req, res) => {
	try {
		const student = await db('students').where({ id: req.params.id }).first();
		if (student) {
			res.status(200).json(student);
		} else {
			res.status(404).json({ message: "the specified id done't exists" });
		}
	} catch (error) {
		res.status(500).json({ error: 'There was a error trying to get the sudent' });
	}
});

studentsRoute.post('/', async (req, res) => {
	const body = req.body;
	if (body.name && body.cohort_id) {
		try {
			const [ result ] = await db('students').insert(req.body);
			const student = await db('students').where({ id: result }).first();

			res.status(201).json(student);
		} catch (error) {
			res.status(500).json({ error: 'error trying to save the data ' });
		}
	} else {
		res.status(400).json({ message: 'please specified a name and a cohort id for the student' });
	}
});

module.exports = studentsRoute;
