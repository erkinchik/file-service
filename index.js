const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const mongoose = require('mongoose');

dotenv.config();

async function bootstrap() {
	const app = express();

	const PORT = process.env.PORT || 3000;

	app.use(routes);

	await mongoose.connect('mongodb://localhost:27017/file_server');

	app.listen(PORT, () => console.log('Server was started on port: ' + PORT));
}

bootstrap();
