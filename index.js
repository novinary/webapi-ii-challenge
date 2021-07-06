// code away!
// it's recommended to load configuration for .env as early as possible
require('dotenv').config(); // add this line as the first thing to run1

const server = require('./server.js');

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 4444;

// we can now use that port, if set up by heroku or read from .env or 4444 as a default if not set
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
