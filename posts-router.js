const express = require('express');
const router = express.Router();
const Db = require('./data/db.js');

// GET /api/posts	
// Returns an array of all the post objects contained in the database.
router.get('/', async (req, res) => {
	try {
		const posts = await Db.find(req.query);
		res.status(200).json(posts);
	} catch (error) {
		// log error to database
		console.log(error);
		res.status(500).json({
			message: 'The posts information could not be retrieved.'
		});
	}
});

// GET /api/posts/:id	
// Returns the post object with the specified id.
router.get('/:id', async (req, res) => {
	try {
		const post = await Db.findById(req.params.id);

		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (error) {
		// log error to database
		console.log(error);
		res.status(500).json({
			message: 'The post information could not be retrieved.',
		});
	}
});
module.exports = router;