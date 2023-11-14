export const loadOBJ = (filepath, loader) => new Promise((resolve, reject) => {
	loader.setCrossOrigin('Anonymous');//跨域问题
	loader.load(filepath, (object) => {
		resolve(object);
	}, (xhr) => { console.log(`${xhr.loaded / xhr.total * 100}% loaded`); }, (error) => {
		console.error(error);
		reject(error);
	});
})
