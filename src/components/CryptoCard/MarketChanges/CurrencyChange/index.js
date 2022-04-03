const Change = ({ change, }) => {

	return (
		<li className="change">
			<span className="change-time-period">{change[0]}</span>
			<span className="change-percentage">{change[1]}</span>
		</li>
	);
}

const CurrencyChange = ({ title, values, }) => {
	return (
		<article className="currency-change">
			<h4>{title}</h4>
			<ul className="change-list">
				{
					Object.entries(values)
						.map((change, idx) => (
							<Change 
								key={`${title}_${idx}`}
								change={change}
							/>
						))
				}
			</ul>
		</article>
	);
};

export default CurrencyChange;