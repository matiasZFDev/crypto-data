const http = require('http');
const cryptoMap = require('./crypto-map');
require('dotenv').config();

const server = http.createServer(async (req, res) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Controll-Allow-Methods': 'GET',
	}

	if (req.url !== '/') {
		res.writeHead(404, {
			'Content-Type': 'text/html',
			...headers,
		});
		res.write('<h1>Not founded</h1>', () => {
			res.end();
		});
	}

	const cryptoData = await cryptoMap();

	res.writeHead(200, {
		'Content-Type': 'application/json',
		...headers,
	});
	res.write(cryptoData, () => {
		res.end();
	});
});
server.listen(8080);