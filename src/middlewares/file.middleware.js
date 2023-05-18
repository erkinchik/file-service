module.exports = (req, res, next) => {
	let file = new Buffer('');
	req.on('data', function (chunk) {
		file = Buffer.concat([file, chunk]);
	});
	req.on('end', function () {
		req.file = {data: file, mimetype: req.headers['content-type'], size: req.headers['content-length']};
		next();
	});
};
