const helloWorld = async (duration: number): Promise<void> => {
	console.log('Hello World!');
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export default helloWorld;
