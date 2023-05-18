const path = require('path');
const { readdir, stat } = require('fs/promises');
function getDirectory() {
	return path.join(__dirname, '../data');
}

async function getDirectorySize(directory = getDirectory()){
	const files = await readdir( directory );
	const stats = files.map( file => stat( path.join( directory, file ) ) );

	return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

module.exports = {
	getDirectory,
	getDirectorySize
};
