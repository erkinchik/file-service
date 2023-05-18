const fs = require('fs');
const Logger = require('./logger');
const {getDirectorySize} = require('./utils');
class FileAdapter {
	constructor(dir = './data') {
		this.dir = (name) => dir + '/' + name;
		this.logger = new Logger(FileAdapter.name);
	}
	put(name, data){
		return new Promise((resolve, reject) => {
			const stream = fs.createWriteStream(this.dir(name));
			this.logger.log('Start writing the file.png');
			stream.write(data);
			stream.on('error', (e) => {
				this.logger.error(e);
				reject(e);
			});
			getDirectorySize().then(size => this.logger.log(`End writing the file (data directory size ${size} bytes)`));

			resolve({name});
		});
	}
	get(name){
		return fs.createReadStream(this.dir(name));
	}
}
module.exports = FileAdapter;
