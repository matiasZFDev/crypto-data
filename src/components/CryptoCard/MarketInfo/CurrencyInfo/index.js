const CurrencyInfo = ({ title, value, }) => {
	return (
		<article className="currency-info">
			<h4>{title}</h4>
			<div className="data">{value}</div>
		</article>
	);
}

export default CurrencyInfo;