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

module.exports = studentsRoute;
