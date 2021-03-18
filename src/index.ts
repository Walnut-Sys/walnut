const helloWorld = async (duration: number) => {
	console.log('Hello World!');

	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export default helloWorld;
