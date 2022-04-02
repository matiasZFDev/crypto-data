import './index.css';
import { ReactComponent as Bitcoin } from '../../../assets/bitcoin.svg';
import CurrencyInfo from './CurrencyInfo';

const MarketInfo = ({ info, }) => {
	const USLocale = Intl.NumberFormat('en-US');

	const dollarFormat = (value) => {
		return `$${USLocale.format(value)}`;
	}

	const symbolFormat = (value, symbol) => {
		return `~${USLocale.format(value)} ${symbol}`;
	}

	return (
		<div className="market-info">
			<Bitcoin />
			<div className="info-container">
				<CurrencyInfo title="Market cap" value={dollarFormat(info.marketCap)} />
				<CurrencyInfo title="Volume" value={dollarFormat(info.volume)} />
				<CurrencyInfo title="Total supply" value={symbolFormat(info.totalSupply, info.symbol)} />
				<CurrencyInfo title="Max supply" value={symbolFormat(info.maxSupply, info.symbol)} />
			</div>
		</div>
	);
};

export default MarketInfo;