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
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// Model
var Paste = mongoose.model('Paste', mongoose.Schema({ paste: 'string', created_at: 'string', fruit: 'number' }));

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
        res.render('index.jade', {
            title: 'dpaste '+paste.id,
            paste: paste.paste,
            fruit: paste.fruit,
            date: new Date(parseInt(paste.created_at)).toDateString(),
            active: ''
        });
    });
});

app.post('/paste/new', function(req, res)
{
    var paste = new Paste({
        paste: req.param('paste'),
        created_at: new Date().getTime(),
        fruit: Math.floor(Math.random() * 9)
    });

    paste.save(function(err)
    {
        if (err)
            console.log(err);
        res.redirect('/paste/' + paste.id);
    });
});

app.listen(3000);