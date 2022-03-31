import './index.css';
// import LinkedList from '../../helpers/linked-list';
import { useState, useEffect } from 'react';

const App = () => {
	const [currencies, setCurrencies] = useState({});

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		console.log(currencies);
	}, [currencies]);

	return (
    	<div className="App" id="app">
    	</div>
	);
}

export default App;
