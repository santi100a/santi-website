const express = require('express');
const website = express();
const path = require('path');
const port = process.env.PORT ?? 3000;

website.use(express.static(path.join(__dirname, 'www')));

website.all('*', (req, res) => {
	res.status(404).sendFile(process.cwd() + '/www/404.html');
});

website.listen(port, () => console.log(`Ready on http://localhost:${port}/`));
