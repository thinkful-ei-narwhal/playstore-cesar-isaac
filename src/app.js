const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps = require('./app-data.js');

app.get('/apps', (req, res) => {
	const { search = '', sort } = req.query;
	if (sort) {
		if (!['rating', 'app'].includes(sort)) {
			return res.status(400).send('Sort must be one of rating or app');
		}
	}

	let results = apps.filter((app) =>
		app.App.toLowerCase().includes(search.toLowerCase())
	);

	if (sort) {
		sorted = sort.toLowerCase();
		lowerSort = sorted.replace(
			sorted.charAt(0),
			sorted.charAt(0).toUpperCase()
		);
		results.sort((a, b) => {
			return a[lowerSort] > b[lowerSort]
				? 1
				: a[lowerSort] < b[lowerSort]
				? -1
				: 0;
		});
	}

	console.log('all results = ', results.length);
	res.json(results);
});

module.exports = app;
