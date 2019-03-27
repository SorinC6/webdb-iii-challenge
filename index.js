const express = require('express');
const helmet = require('helmet');

const server = express();

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n*** Server running on PORT: ${port} ***\n`));
