const FileService = require('../services/file.service');

class FileController {
	constructor(fileService = new FileService()) {
		this.service = fileService;
	}

	async put(req, res){
		const name = req.params.name;
		const {data, ...meta} = req.file;
		await this.service.put(name, data, meta);
		res.json({status: 'ok'});
	}

	async get(req, res){
		const name = req.params.name;
		const {stream, meta} = await this.service.get(name);

		res.setHeader('content-type', meta.mimetype);
		res.setHeader('content-length', meta.size);
		stream.pipe(res);
	}
}

module.exports = FileController;
