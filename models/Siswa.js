const connection = require('./connection');

class Siswa {
	getAll(callback) {
		connection.query('SELECT * FROM siswa', function(err, rows, fields) {
			callback();
		});
	}
}

module.exports = Siswa;