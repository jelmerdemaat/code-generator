const express = require('express'),
    app = express(),
    path = require('path'),
    generate = require('./api/api');

app.set('view engine', 'twig');
app.set('port', (process.env.PORT || 3000));

app.use('/vendor/', express.static('node_modules/'));

function render (req, res, output = '', status = 200) {
    res.status(status).render(
        path.join(__dirname, '/views/', req.baseUrl),
        Object.assign(req.query, {
            output: output
        })
    );
}

app.use('/', (req, res) => {
    if (req.query && req.query.input) {
        generate(req.query)
            .then(data => {
                render(req, res, data);
            })
            .catch(error => {
                render(req, res, error, 400);
            });
    } else {
        render(req, res);
    }
});

app.use((req, res) => {
	res.status(404).send('Damn! 4-oh-4!');
});

app.listen(app.get('port'), function() {
    console.log(`App listening on http://localhost:${app.get('port')}`);
});
