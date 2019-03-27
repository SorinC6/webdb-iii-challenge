const express = require('express');
const helmet = require('helmet');

//importing Routes
const cohortRoutes = require('../routes/cohort-routes');
//const studentsRoutes = require('../routes/students-routes');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohortRoutes);
// server.use(studentsRoutes);

module.exports = server;
