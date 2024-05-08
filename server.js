// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

let movies = [];

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'public/uploads/' });

app.post('/add_movie', upload.single('photo'), (req, res) => {
    const { title, director, rating } = req.body;
    const photo = req.file ? req.file.filename : null;

    movies.push({ title, director, rating, photo });

    res.redirect('/list_of_movies1');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/list_of_movies1', (req, res) => {
    res.render('list_of_movies1', { movies });
});
app.get('/other_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'other_page.html'));
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na http://localhost:${PORT}`);
});