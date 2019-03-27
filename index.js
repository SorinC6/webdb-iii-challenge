const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

const port = process.env.PORT || 4000;

server.get('/', (req, res) => {
	res.send('<h1>HEllo from the Server</h1>');
});

server.listen(port, () => console.log(`\n*** Server running on PORT: ${port} ***\n`));
