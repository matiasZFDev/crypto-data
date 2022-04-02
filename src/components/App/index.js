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
				total_market_cap: '1000',
				volume: '1000',
				total_supply: '19000000',
				max_supply: '21000000',
				changes: {
					price: {
						'24h': '-0.36',
					},
				},
			},
			{
				name: 'Bitcoing',
				symbol: 'BTC',
				id: 2139,
			},
			{
				name: 'Ethereum',
				symbol: 'ETH',
				id: 371,
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
