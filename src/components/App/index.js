import './index.css';
import LinkedList from '../../helpers/linked-list';
import { useState, useEffect } from 'react';

const App = () => {
	const [currencies, setCurrencies] = useState({});

	useEffect(() => {
		const reduceCurrenciesData = (data) => {
			const reduced = {};

			data.forEach(({ id, name, symbol, type, }) => {
				const data = { id, name, type, };

				if (reduced[symbol] !== undefined) {
					const { id, name, type } = reduced[symbol];

					if (reduced[symbol].root === undefined) {
						reduced[symbol] = new LinkedList({
							id, name, type,
						});
					}

					reduced[symbol].unshift(data);
				} else {
					reduced[symbol] = data;
				}
			});

			setCurrencies(reduced);
		};

		const fetchCryptoList = async () => {
			const { 
				REACT_APP_BRAVE_NEW_COIN_API_KEY, 
				//REACT_APP_BRAVE_NEW_COIN_AUTH_TOKEN,
			} = process.env;
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'bravenewcoin.p.rapidapi.com',
					'X-RapidAPI-Key': REACT_APP_BRAVE_NEW_COIN_API_KEY,
				}
			};

			try {
				const res = await fetch('https://bravenewcoin.p.rapidapi.com/asset?status=ACTIVE', options);
				const json = await res.json();

				if (!res.ok) {
					throw new Error();
				}

				reduceCurrenciesData(json.content);
			} catch (err) {
				console.log(err);
			}
		};

		fetchCryptoList();
	}, []);

	useEffect(() => {
		// console.log(currencies);
	}, [currencies]);

	return (
    	<div className="App" id="app">
    	</div>
	);
}

export default App;
