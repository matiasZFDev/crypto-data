const Currency = ({ data, handleClick, selected, }) => {
	return (
		<div 
			className={`currency ${selected ? 'is-selected' : ''}`} 
			data-id={data.id} 
			onClick={handleClick}
			tabIndex={1}>
				{`${data.name} (${data.symbol})`}
		</div>
	);
}

export default Currency;