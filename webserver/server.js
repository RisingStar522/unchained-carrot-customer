const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3300;

const STATIC = path.resolve(__dirname, 'dist');

app.use('/js', express.static(`${path.join(STATIC, 'js')}`));
app.use('/css', express.static(`${path.join(STATIC, 'css')}`));
app.use('/img', express.static(`${path.join(STATIC, 'img')}`));

app.use('/favicon.png', express.static(`${STATIC}`));
app.use('/manifest.json', express.static(`${STATIC}`));
app.use('/robots.txt', express.static(`${STATIC}`));
app.use('/service-worker.js', express.static(`${STATIC}`));
app.use('/precache-manifest*', express.static(`${STATIC}`));

app.use('*', (req, resp) => {
    resp.sendFile(`${path.resolve(__dirname, 'dist')}/index.html`);
});

app.listen(port);
