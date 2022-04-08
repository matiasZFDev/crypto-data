const https = require('https');

const getCryptoMap = () => {
	const { NOMICS_API_KEY, } = process.env;

	const options = {
		host: 'api.nomics.com',
		path: `/v1/currencies/ticker?key=${NOMICS_API_KEY}&interval=1d,7d,30d`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	};

	return new Promise((resolve) => {
		const requestCb = (response) => {
			let responseText = '';

			response.on('data', (chunk) => {
				responseText += chunk;
			});

			response.on('end', () => {
				resolve({
					status: 200,
					responseText,
				});
			});
		};

		const req = https.request(options, requestCb);
		req.end();
	})
};

const getChanges = (obj, prefix) => {
	return {
		'1h': obj['1d']?.[`${prefix}_change_pct`] ?? null,
		'7d': obj['7d']?.[`${prefix}_change_pct`] ?? null,
		'30d': obj['30d']?.[`${prefix}_change_pct`] ?? null,
	}
}

const formatData = (data) => {
	const formatted = [];

	data.forEach(({id, name, symbol, price, marketCap, ...crypto}) => {
		formatted.push({
			id, name, symbol, price,
			marketCap: crypto.market_cap, 
			volume: crypto['1d']?.volume ?? null,
			circulatingSupply: crypto.circulating_supply,
			maxSupply: crypto.max_supply,
			changes: {
				price: getChanges(crypto, 'price'),
				marketCap: getChanges(crypto, 'market_cap'),
				volume: getChanges(crypto, 'volume'),
			}
		});
	});

	return JSON.stringify(formatted);
}

const cryptoMap = async () => {
	const res = await getCryptoMap();
	return formatData(JSON.parse(res.responseText));
};

module.exports = cryptoMap;