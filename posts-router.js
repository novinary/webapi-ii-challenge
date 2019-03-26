const express = require('express');
const router = express.Router();
const Db = require('./data/db.js');
router.use(express.json());

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

// POST /api/posts
// Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
	const post = req.body;
	if (post.title && post.contents) {
		res.status(201).json(post);
	} else {
		res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
		return;
	}
	Db.insert(post)
		.then((post) => {
			console.log('Created post => ', post);
		})
		.catch((error) => {
			res.status(500).json({ error: 'There was an error while saving the post to the database' });
		});
});

// DELETE /api/posts/:id	
// Removes the post with the specified id and returns the deleted post object.
// You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Db.remove(id)
		.then((post) => {
			if (post) {
				console.log('Deletion if post id:', id);
				res.json(id);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});


// PUT /api/posts/:id	
// Updates the post with the specified id using data from the request body.
// Returns the modified document, NOT the original.
router.put('/:id', async (req, res) => {
	try {
        const post = await Db.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post could not be found' });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error updating the post',
        });
    }
});

module.exports = router;