// Scaffolding
var express = require('express');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('localhost', 'dpaste');

// Configuration
app.configure(function()
{
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/views');
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.domain = 'dpaste.cc';
    app.port = 3001;
});

// Model
var Paste = mongoose.model('Paste', mongoose.Schema({ paste: 'string', created_at: 'string', fruit: 'number' }));

// Middleware
app.all('*', function(req, res, next)
{
    // Set base URL for templates
    app.locals.base = req.protocol + '://' + app.domain;
    next();
});

// Routes
app.get('/', function(req, res)
{
    res.render('index.jade', { title: 'dpaste', active: 'active' });
});

app.get('/paste/:id', function(req, res)
{
    Paste.findById(req.params.id, function(err, paste)
    {
        if (err)
            console.log(err);

        if (req.headers['user-agent'].match(/curl/))
            res.send(200, paste.paste);

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

app.post('/paste/new', function(req, res)
{
    if (lepaste = req.param('paste'))
    {
        var paste = new Paste({
            paste: lepaste,
            created_at: new Date().getTime(),
            fruit: Math.floor(Math.random() * 9)
        });

        paste.save(function(err)
        {
            if (err)
                console.log(err);

            var new_paste = '/paste/' + paste.id;

            if (req.headers['user-agent'].match(/curl/))
                res.send(201, app.locals.base + new_paste);
            else
                res.redirect(new_paste);
        });
    }

    else
        res.redirect('/');
});

app.listen(app.port);
