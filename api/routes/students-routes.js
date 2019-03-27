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

module.exports = studentsRoute;
