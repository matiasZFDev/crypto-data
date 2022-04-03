const hexChars = ['a', 'b', 'c', 'd', 'e', 'f'];

export const randomColor = (min, max) => {
	let hexColor = '#';

	for (let i = 0; i < 6; i++) {
		const ran = Math.floor((Math.random() * (max - min)) + min);
		hexColor += ran < 9 ? ran : hexChars[ran - 9];
	}

	return hexColor
};