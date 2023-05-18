const { Router } = require('express');
const FileController = require('../controllers/file.controller');
const FileService = require('../services/file.service');
const FileModel = require('../models/file.model');
const FileAdapter = require('../../lib/file.adapter');
const fileMiddleware = require('../middlewares/file.middleware');
const fileRoute = Router();
const controller = new FileController(
	new FileService(
		new FileAdapter(),
		FileModel,
	)
);
fileRoute.put('/:name', fileMiddleware, (req, res) => controller.put(req, res));
fileRoute.get('/:name', (req, res) => controller.get(req, res));

module.exports = fileRoute;
