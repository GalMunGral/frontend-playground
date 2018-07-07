const app = (require('express'))();

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.listen(8080, () => console.log('Listening on 8080!'));
