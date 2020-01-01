var express = require('express');
var router = express.Router();
var connection = require('../models/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM siswa', function(err, rows, fields) {
	  res.render('pages/home', { title: 'Home page', data: rows });
	});
});

router.post('/store', function(req, res, next) {
	var { name, email } = req.body;
	connection.query(`INSERT INTO siswa (name, email) VALUES ('${name}', '${email}')`, function(err, rows, fields) {
		if (err) throw err;
		res.locals.message = req.flash('success', 'Data successfully inserted!');
		res.redirect('/');
	});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	connection.query('DELETE FROM siswa WHERE id = '+id, function(err, rows, fields) {
		if (err) throw err;
		res.locals.message = req.flash('success', 'Data successfully deleted!');
		res.redirect('/');
	});
});

router.get('/edit/:id', function(req, res, next) {
	var id = req.params.id;
	connection.query('SELECT * FROM siswa WHERE id = '+id, function(err, rows, fields) {
		if (err) throw err;
		res.render('pages/edit', {title: 'Edit data', data: rows});
	});
});

router.post('/update/:id', function(req, res, next) {
	var id = req.params.id;
	var {name, email} = req.body;
	connection.query(`UPDATE siswa SET name = '${name}', email = '${email}' WHERE id = ${id}`, function(err) {
		if (err) throw err;
		res.redirect('/');
	});
});

module.exports = router;
