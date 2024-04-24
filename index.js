const express = require('express');
const website = express();
const path = require('path');
const port = process.env.PORT ?? 3000;

website.use(express.static(path.join(__dirname, 'www'))); 

website.use((_, response, next) => {
    response.status(403).sendFile(process.cwd() + '/www/403.html');
    next();
});
website.use((_, response, next) => {
    response.status(404).sendFile(process.cwd() + '/www/404.html');
    next();
});
website.use((_, response, next) => {
    response.status(500).sendFile(process.cwd() + '/www/500.html');
    next();
});
website.use((_, response, next) => {
    response.status(503).sendFile(process.cwd() + '/www/503.html');
    next();
});


website.listen(port, () => console.log(`Ready on http://localhost:${port}/`));