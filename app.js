// Scaffolding
var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

mongoose.connect('localhost', 'dpaste');

// Configuration
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/views');
    app.use(require('stylus').middleware({
        src: __dirname + '/stylesheets',
        dest: __dirname + '/public/stylesheets'
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.port = 3001;
});

// Model
var Paste = mongoose.model('Paste', mongoose.Schema({ paste: 'string', created_at: 'string', fruit: 'number' }));

// Middleware
app.all('*', function(req, res, next) {
    // Set base URL for templates
    app.locals.base = 'https://dpaste.neemzy.org';
    next();
});

// Routes
app.get('/', function(req, res) {
    res.render('index.jade', { title: 'dpaste', active: 'active' });
});

app.get('/paste/:id', function(req, res) {
    Paste.findById(req.params.id, function(err, paste) {
        if (err) {
            console.log(err);
        }

        if (req.headers['user-agent'].match(/curl/)) {
            res.send(200, paste.paste);
        }

        res.render('index.jade', {
            title: 'dpaste - ' + paste.id,
            link: app.locals.base + '/paste/' + paste.id,
            paste: paste.paste,
            fruit: paste.fruit,
            date: new Date(parseInt(paste.created_at)).toDateString(),
            active: ''
        });
    });
});

app.post('/paste/new', function(req, res) {
    if (lePaste = req.param('paste')) {
        var paste = new Paste({
            paste: lePaste,
            created_at: new Date().getTime(),
            fruit: Math.floor(Math.random() * 9)
        });

        paste.save(function(err) {
            if (err) {
                console.log(err);
            }

            var newPaste = '/paste/' + paste.id;

            if (req.headers['user-agent'].match(/curl/)) {
                res.send(201, app.locals.base + newPaste);
            } else {
                res.redirect(newPaste);
            }
        });
    } else {
        res.redirect('/');
    }
});

app.listen(app.port);
