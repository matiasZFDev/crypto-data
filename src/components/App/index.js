import './index.css';
import Header from '../Header';
import CryptoSelect from '../CryptoSelect';
import CryptoCard from '../CryptoCard';
import { useState, useEffect, } from 'react';

const App = () => {
	const [currencies, setCurrencies] = useState(null);
	const [currency, setCurrency] = useState(null);

	useEffect(() => {
		const fetchCryptoList = async () => {
			try {
				const res = await fetch('http://localhost:8080');
				const json = await res.json();

				if (!res.ok) {
					throw new Error();
				}

				const dataMap = new Map();
				json.forEach((currency) => {
					dataMap.set(currency.id, currency);
				});
				setCurrencies(dataMap);
			} catch (err) {
				console.log(err);
			}
		};

		fetchCryptoList();
	}, []);

	useEffect(() => {
		if (currencies === null) return;

		const random = Math.floor(Math.random() * currencies.size);
		const keyArr = Array.from(currencies.keys());
		const randomKey = keyArr[random];
		setCurrency(currencies.get(randomKey));
	}, [currencies]);

	return (
    	<div id="app">
			<Header />
			<CryptoSelect currencies={currencies} currency={currency} setCurrency={setCurrency} />
			<CryptoCard currency={currency} />
    	</div>
	);
}

export default App;
