const express = require('express');
const knex = require('knex');
// knex takes an object as an argument, that's why you need to call
// the `development` object from knexfile export
const knexConfig = require('../knexfile').development;

const db = knex(knexConfig);
const routes = express.Router();

routes.use(express.json());

// [GET] all cohorts - returns an ARRAY of objects with all cohorts
routes.get('/', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// [GET] cohort by ID - returns an object with cohort data
routes.get('/:id', async (req, res) => {
  const cohortId = req.params.id;
  try {
    const oneCohort = await db('cohorts').where('id', cohortId).first();

    if (oneCohort) {
      res.status(200).json(oneCohort);
    } else {
      res.status(404).json({ message: `Cohort with ID ${cohortId} does not exist.`});
    }

  } catch (error) {
    res.status(500).json({ error });
  }
});

// [GET] students for the cohorts ID - returns an ARRAY with student data
routes.get('/:id/students', async (req, res) => {
  const cohortId = req.params.id;
  try {
    const cohortStudents = await db.select().from('students', ).where('cohort_id', cohortId);
    const oneCohort = await db('cohorts').where('id', cohortId).first();

    if (cohortStudents.length > 0) {
      res.status(200).json(cohortStudents);
    } else if (oneCohort) {
      res.status(404).json({ message: `Cohort with ID ${cohortId} does not have any students.`});
    } else {
      res.status(404).json({ message: `Cohort with ID ${cohortId} does not exist.`});
    }

  } catch (error) {
    res.status(500).json({ error });
  }
});

// [POST] create new cohort - returns an ARRAY with ID of new cohort
routes.post('/', async (req, res) => {
  const cohortName = req.body.name;
  if (cohortName) {
    try {
      const newCohort = await db('cohorts').insert({ name: cohortName });
      res.status(200).json(newCohort);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ message: `Please include name in request body.` })
  }
});

// [DELETE] cohort by ID - returns number of deleted rows
routes.delete('/:id', async (req, res) => {
  const cohortId = req.params.id;
  try {
    const deletedCohort = await db('cohorts').where('id', cohortId).del();

    if (deletedCohort > 0) {
      res.status(200).json({ message: `Cohort with ID ${cohortId} was deleted.` });
    } else {
      res.status(404).json({ message: `Cohort with ID ${cohortId} does not exist.`});
    }

  } catch (error) {
    res.status(500).json({ error });
  }
});

// [PUT] create new cohort - returns updated cohort OBJECT
routes.put('/:id', async (req, res) => {
  const cohortName = req.body.name;
  const cohortId = req.params.id;

  if (cohortName) {
    try {
      const updatedCohort = await db('cohorts').where('id', cohortId).update({ name: cohortName });
      if (updatedCohort > 0) {
        const oneCohort = await db('cohorts').where('id', cohortId).first();
        res.status(200).json(oneCohort);
      } else {
        res.status(404).json({ message: `Cohort with ID ${cohortId} does not exist.`});
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ message: `Please include name in request body.` })
  }
});


module.exports = routes;