const express = require('express');
const routes = express.Router();
const Db = require('./data/db.js');

routes.use(express.json());

// GET /api/posts	
// Returns an array of all the post objects contained in the database.
routes.get('/api/posts', (req, res) => {
	Db.find(req.query)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The posts information could not be retrieved.'
			});
		});
});

module.exports = routes;