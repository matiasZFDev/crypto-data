import './index.css';
import { useState, useEffect, useRef, } from 'react';
import Currency from './Currency';

const CryptoSelect = ({ currencies, currency, setCurrency, }) => {
	const [matchingCurrencies, setMatchingCurrencies] = useState(null);
	const currenciesRef = useRef(null);
	const searchInputRef = useRef(null);
	const maxLength = 10;

	const hideCurrencies = () => {
		setMatchingCurrencies(null);
	}

	const filterCurrencies = (value, current = matchingCurrencies) => {
		const filtered = new Map();
		let i = 0;

		for (const [id, data] of current) {
			if (data.name.toLowerCase().includes(value)
				|| data.symbol.toLowerCase().includes(value)) {
				filtered.set(id, data);
				i++;

				if (i === maxLength) {
					break;
				}
			}
		}

		setMatchingCurrencies(filtered);
	}

	const handleChange = (e) => {
		let current = undefined;
		let { value, } = e.target;

		if (e.nativeEvent.data ?? false) {
			const oldValue = value.slice(0, value.length - e.nativeEvent.data.length);

			if (oldValue.length === 0) {
				current = currencies;
			}
		} else {
			if (value === '') {
				hideCurrencies();
				return;
			}

			current = currencies;
		}

		filterCurrencies(value.toLowerCase().trim(), current);
	}

	const handleClick = (e) => {
		const newId = parseInt(e.target.dataset.id);

		// for (const option of currenciesRef.current.children) {
		// 	if (option.dataset.id === currency.id.toString()) {
		// 		option.classList.remove('is-selected');
		// 		break;
		// 	}
		// }
		setMatchingCurrencies(null);
		setCurrency(currencies.get(newId));
	}

	useEffect(() => {
		if (matchingCurrencies === null || matchingCurrencies.size === 0) {
			currenciesRef.current.classList.add('is-empty');
		} else {
			currenciesRef.current.classList.remove('is-empty');
		}
	}, [matchingCurrencies]);

	const mapCurrencies = () => {
		if (matchingCurrencies === null) return null;
		console.log('pass');

		const components = [];
		let i = 0;

		for (const [id, data] of matchingCurrencies) {
			if (i === maxLength) {
				break;
			}

			let selected = '';

			if (id === currency.id) {
				selected = 'is-selected';
			}

			components.push(
				<Currency 
					key={id}
					data={currency}
					handleClick={handleClick}
					selected={selected}
				/>
			);

			i++;
		}

		return components;
	}

	return (
		<div id="select">
			<div className="dropdown">
				<input 
					type="search" 
					ref={searchInputRef}
					placeholder={currency && `${currency.name} (${currency.symbol})`} 
					onChange={handleChange} 
				/>
				<div className="currencies" ref={currenciesRef}>
					{mapCurrencies()}
				</div>
			</div>
			<button>Search</button>
		</div>
	);	
};

export default CryptoSelect;