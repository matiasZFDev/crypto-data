import './index.css'
import CurrencyChange from './CurrencyChange';

const MarketChanges = ({ changes, }) => {
	return (
		<section className="market-changes">
			<h3>Changes</h3>
			<div className="changes">
				<CurrencyChange title="Price" values={changes.price} />
				<CurrencyChange title="Volume" values={changes.volume} />
			</div>
		</section>
	);
};

export default MarketChanges;