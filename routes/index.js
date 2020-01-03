var express = require('express');
var router = express.Router();
var connection = require('../models/connection');
var siswa = require('../models/Siswa');
var dateFormat = require('dateformat');

/* GET home page. */
router.get('/', function(req, res, next) {
	siswa.get(function(data) {
	  res.render('pages/home', { title: 'Home page', data: data, date: dateFormat });
	});
});

router.post('/store', function(req, res, next) {
	var { name, email } = req.body;
	siswa.insert(function() {
		res.locals.message = req.flash('success', 'Data successfully inserted!');
		res.redirect('/');
	}, {
		name: siswa.prefix(name),
		email: siswa.prefix(email)
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
