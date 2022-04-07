import './index.css';
import { useState, useEffect, useRef, } from 'react';
import Currency from './Currency';

const CryptoSelect = ({ currencies, currency, setCurrency, }) => {
	const [matchingCurrencies, setMatchingCurrencies] = useState(null);
	const [activeCurrency, setActiveCurrency] = useState(null);
	const currenciesRef = useRef(null);
	const searchInputRef = useRef(null);
	const maxLength = 10;

	const hideCurrencies = () => {
		setMatchingCurrencies(null);
	}

	const filterCurrencies = (value, current = matchingCurrencies) => {
		const currentCopy = new Map(current);
		const filtered = new Map();

		if (currentCopy.delete(currency.id)) {
			if (currency.name.toLowerCase().includes(value)
				|| currency.symbol.toLowerCase().includes(value)) {
				filtered.set(currency.id, currency);
			}
		}

		for (const [id, data] of currentCopy) {
			if (data.name.toLowerCase().includes(value)
				|| data.symbol.toLowerCase().includes(value)) {
				filtered.set(id, data);
			}
		}

		setMatchingCurrencies(filtered);
	}

	const handleChange = (e) => {
		if (currencies === null) {
			return;
		}

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

		setActiveCurrency(null);
		filterCurrencies(value.toLowerCase().trim(), current);
	}

	const setNewCurrency = (currency) => {
		setMatchingCurrencies(null);
		setCurrency(currency);
		searchInputRef.current.value = '';
	}

	const handleClick = (e) => {
		const newId = e.target.dataset.id;
		setNewCurrency(currencies.get(newId));
	}

	const selectActive = () => {
		if (matchingCurrencies === null || matchingCurrencies.size === 0) {
			return;
		}

		const activeElement = matchingCurrencies.size === 1 || activeCurrency === null
			? currenciesRef.current.firstElementChild
			: activeCurrency;
		const activeCurrency = matchingCurrencies.get(activeElement.dataset.id);
		setActiveCurrency(null);
		setNewCurrency(activeCurrency);
	}

	const handleKeyDown = (e) => {
		if (e.nativeEvent.key === 'Enter') {
			selectActive();
			return;
		}

		if (e.nativeEvent.key === 'ArrowDown') {
			const activeElement = activeCurrency;

			if (activeCurrency === null) {
				setActiveCurrency(currenciesRef.current.firstElementChild);
				return;
			}

			if (activeCurrency.nextElementSibling === null) {
				setActiveCurrency(null);
				activeElement.classList.remove('is-dropdown-select');
				return;
			}

			setActiveCurrency(activeCurrency.nextElementSibling);
			activeElement.classList.remove('is-dropdown-select');
			return;
		}

		if (e.nativeEvent.key === 'ArrowUp') {
			const activeElement = activeCurrency;

			if (activeCurrency === null) {
				setActiveCurrency(currenciesRef.current.lastElementChild);
				return;
			}

			if (activeCurrency.previousElementSibling === null) {
				setActiveCurrency(null);
				activeElement.classList.remove('is-dropdown-select');
				return;
			}

			setActiveCurrency(activeCurrency.previousElementSibling);
			activeElement.classList.remove('is-dropdown-select');
			return;
		}
	}

	useEffect(() => {
		if (activeCurrency === null) {
			return;
		}

		activeCurrency.classList.add('is-dropdown-select');
	}, [activeCurrency]);

	const handleBlur = (e) => {
		if (e.relatedTarget?.classList.contains('currency')
			|| e.relatedTarget?.parentNode.id === 'select') {
			return;
		}

		setMatchingCurrencies(null);
		setActiveCurrency(null);
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
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
				/>
				<div className="currencies" ref={currenciesRef}>
					{mapCurrencies()}
				</div>
			</div>
			<button onClick={selectActive}>Search</button>
		</div>
	);	
};

export default CryptoSelect;