import './index.css';

const Header = ({ currency, }) => {
	const dollarUSLocale = Intl.NumberFormat('en-US');

	const priceFormat = () => {
		return dollarUSLocale.format(currency.price);
	}

	return (
		<header className="card-header">
			<h2>{currency.name}</h2>
			<span className="currency-symbol">{currency.symbol}</span>
			<span className="currency-price">${priceFormat()}</span>
		</header>
	);
};

export default Header;