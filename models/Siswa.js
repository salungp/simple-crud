const connection = require('./connection');

function get(callback) {
	connection.query('SELECT * FROM siswa', function(err, rows, fields) {
		callback(rows);
	});
}

function insert(callback, data) {
	connection.query(insertQuery(data), function(err, rows, fields) {
		if (err) throw err;
		callback();
	});
}

function insertQuery(data) {
	let keys = Object.keys(data).join(', ');
	let values = Object.values(data).toString();
	let query = 'INSERT INTO siswa (' + keys + ') VALUES (' + values + ')';
	return query;
}

function prefix(str) {
	return '"' + str + '"';
}

module.exports.get = get;
module.exports.insert = insert;
module.exports.prefix = prefix;