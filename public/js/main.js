(async () => {
	const supported =await navigator.xr.isSessionSupported('immersive-vr');
	console.log(supported);
})();
