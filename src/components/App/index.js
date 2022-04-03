import './index.css';
import Header from '../Header';
import CryptoSelect from '../CryptoSelect';
import CryptoCard from '../CryptoCard';
import { useState, useEffect, } from 'react';

const App = () => {
	const [currencies, setCurrencies] = useState(null);
	const [currency, setCurrency] = useState(null);

	useEffect(() => {
		// fetch
		const data = [
			{
				name: 'Bitcoin',
				symbol: 'BTC',
				id: 1,
				price: 49000,
				marketCap: 823588,
				volume: 56848646,
				totalSupply: 19000000,
				maxSupply: 21000000,
				changes: {
					price: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					marketCap: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					volume: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
				},
			},
			{
				name: 'Bitcoing',
				symbol: 'BTC',
				id: 2139,
				price: 49000,
				marketCap: 823588,
				volume: 56848646,
				totalSupply: 19000000,
				maxSupply: 21000000,
				changes: {
					price: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					marketCap: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					volume: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
				},
			},
			{
				name: 'Ethereum',
				symbol: 'ETH',
				id: 371,
				price: 49000,
				marketCap: 823588,
				volume: 56848646,
				totalSupply: 19000000,
				maxSupply: 21000000,
				changes: {
					price: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					marketCap: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
					volume: {
						'24h': -0.36,
						'7d': 9.34,
						'30d': 54.16,
					},
				},
			},
		];

		const dataMap = new Map();
		data.forEach((currency) => {
			dataMap.set(currency.id, currency);
		});
		setCurrencies(dataMap);
	}, []);

	useEffect(() => {
		if (currencies === null) return;

		const random = Math.floor(Math.random() * currencies.size);
		const keyArr = Array.from(currencies.keys());
		const randomKey = keyArr[random];
		setCurrency(currencies.get(randomKey));
	}, [currencies]);

	/*useEffect(() => {
		const fetchCryptoList = async () => {
			try {
				const res = await fetch('http://localhost:8080');
				const json = await res.json();

				if (!res.ok) {
					throw new Error();
				}

				setCurrencies(json);
			} catch (err) {
				console.log(err);
			}
		};

		fetchCryptoList();
	}, []);*/

	return (
    	<div id="app">
			<Header />
			<CryptoSelect currencies={currencies} currency={currency} setCurrency={setCurrency} />
			<CryptoCard currency={currency} />
    	</div>
	);
}

export default App;
