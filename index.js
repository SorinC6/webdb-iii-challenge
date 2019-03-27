const server = require('./api/server/server');

const port = process.env.PORT || 4000;

server.get('/', (req, res) => {
	res.send('<h1>HEllo from the Server</h1>');
});

server.listen(port, () => console.log(`\n*** Server running on PORT: ${port} ***\n`));
