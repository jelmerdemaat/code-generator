const express = require('express'),
    app = express(),
    path = require('path'),
    generate = require('./api/api');

app.set('view engine', 'twig');
app.set('port', (process.env.PORT || 3000));

app.use('/vendor/', express.static('node_modules/'));

app.use('/', (req, res) => {
    generate(req.query)
        .then(data => {
            res.render(
                path.join(__dirname, '/views/', req.baseUrl),
                Object.assign(req.query, {
                    output: data
                })
            );
        })
        .catch(error => {
            res.status(400).render(
                path.join(__dirname, '/views/', req.baseUrl),
                Object.assign(req.query, {
                    output: error
                })
            );
        });
});

app.use((req, res) => {
	res.status(404).send('Damn! 4-oh-4!');
});

app.listen(app.get('port'), function() {
    console.log(`App listening on http://localhost:${app.get('port')}`);
});
