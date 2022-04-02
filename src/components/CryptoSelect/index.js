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

	const setNewCurrency = (currency) => {
		setMatchingCurrencies(null);
		setCurrency(currency);
		searchInputRef.current.value = '';
	}

	const handleClick = (e) => {
		const newId = parseInt(e.target.dataset.id);
		setNewCurrency(currencies.get(newId));
	}

	const selectFirstMatch = () => {
		if (matchingCurrencies === null || matchingCurrencies.size === 0) {
			return;
		}

		const firstMatch = matchingCurrencies[Symbol.iterator]().next().value[1];
		setNewCurrency(firstMatch);
	}

	const handleEnter = (e) => {
		if (e.nativeEvent.key !== 'Enter') {
			return;
		}

		selectFirstMatch();
	}

	const handleBlur = (e) => {
		if (e.relatedTarget?.classList.contains('currency')) {
			return;
		}

		setMatchingCurrencies(null);
		searchInputRef.current.value = '';
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

		const newMap = new Map(matchingCurrencies);
		const components = [];
		let i = 0;

		/* push selected to start (if matching) */

		if (newMap.delete(currency.id)) {
			components.push(
				<Currency 
					key={currency.id}
					data={currency}
					handleClick={handleClick}
					selected={true}
				/>
			);
			i++;
		}

		for (const [id, data] of newMap) {
			if (i === maxLength) {
				break;
			}

			components.push(
				<Currency 
					key={id}
					data={data}
					handleClick={handleClick}
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
					onKeyDown={handleEnter}
					onBlur={handleBlur}
				/>
				<div className="currencies" ref={currenciesRef}>
					{mapCurrencies()}
				</div>
			</div>
			<button onClick={selectFirstMatch}>Search</button>
		</div>
	);	
};

export default CryptoSelect;