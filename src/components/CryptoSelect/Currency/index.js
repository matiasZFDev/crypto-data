const Currency = ({ data, handleClick, selected, }) => {
	return (
		<div 
			className={`currency ${selected && 'is-selected'}`} 
			data-id={data.id} 
			onClick={handleClick}
			>
				{`${data.name} (${data.symbol})`}
		</div>
	);
}

export default Currency;