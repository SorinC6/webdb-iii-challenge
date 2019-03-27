const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile').development;

const db = knex(knexConfig);

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
	try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
	} catch (error) {
		res.status(500).json({ error: 'Unable to perform this operation' });
	}
});

const port = process.env.PORT || 4000;

server.get('/', (req, res) => {
	res.send('<h1>HEllo from the Server</h1>');
});

server.listen(port, () => console.log(`\n*** Server running on PORT: ${port} ***\n`));
