const express = require('express');
const cohortRoutes = require('./routes/cohortsRoutes');

const app = express();

app.use(express.json());

const cohortsUrl = '/api/cohorts';
const studentsUrl = '/api/students';

app.use(cohortsUrl, cohortRoutes);

const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.log(`Express app listening on http://127.0.0.1:${PORT}`));