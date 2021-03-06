import './index.css';
import { ReactComponent as Bitcoin } from '../../../assets/bitcoin.svg';
import CurrencyInfo from './CurrencyInfo';

const MarketInfo = ({ info, }) => {
	const USLocale = Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 2,
	});

	const dollarFormat = (value) => {
		return `$ ${USLocale.format(value)}`;
	}

	const symbolFormat = (value, symbol) => {
		if (value === undefined) {
			return `- - ${symbol}`;
		}

		return `~ ${USLocale.format(value)} ${symbol}`;
	}

	return (
		<div className="market-info">
			<Bitcoin />
			<div className="info-container">
				<CurrencyInfo title="Market cap" value={dollarFormat(info.marketCap)} />
				<CurrencyInfo title="Volume 24h" value={dollarFormat(info.volume)} />
				<CurrencyInfo title="Circulating supply" value={symbolFormat(info.circulatingSupply, info.symbol)} />
				<CurrencyInfo title="Max supply" value={symbolFormat(info.maxSupply, info.symbol)} />
			</div>
		</div>
	);
};

export default MarketInfo;