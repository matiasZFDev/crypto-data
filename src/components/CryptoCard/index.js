import './index.css';
import { useEffect, } from 'react';
import Header from './Header';
import MarketInfo from './MarketInfo';
import MarketChanges from './MarketChanges';
import Loading from './Loading';

const CryptoCard = ({ currency, }) => {
	useEffect(() => {
		document.documentElement.style.setProperty('--card-modal', '#ffd700bb');
	}, [currency]);

	return (
		<div id="crypto-card-wrapper">
		{
			currency === null 
				? <Loading />
				: 
				<div className="crypto-card">
					<Header currency={currency} />
					<MarketInfo info={currency} />
					<MarketChanges changes={currency.changes} />
				</div>
		}
		</div>
	);
};

export default CryptoCard;