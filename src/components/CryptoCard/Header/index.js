import './index.css';

const Header = ({ currency, }) => {
	const getMFD = () => {
		if (currency.price < 0.001) return 6;
		if (currency.price < 1) return 4;
		if (currency.price < 10) return 2;
		if (currency.price < 20) return 1;
		return 0;
	}

	const dollarUSLocale = Intl.NumberFormat('en-US', {
		maximumFractionDigits: getMFD(currency),
	});

	const priceFormat = () => {
		return dollarUSLocale.format(currency.price);
	}

	return (
		<header className="card-header">
			<h2 data-length={currency.name.length}>{currency.name}</h2>
			<span className="currency-symbol">{currency.symbol}</span>
			<span className="currency-price">${priceFormat()}</span>
		</header>
	);
};

export default Header;