// require packages used in the project
const express = require('express');
const app = express();
const port = 3000;

// require express-handlebars here
const exphbs = require('express-handlebars');
const movieList = require('./movies.json');

// load static files in 'public' directory
app.use(express.static('public'));

// setting tempate engine
// app.engine：透過這個方法來定義要使用的樣板引擎
// 第一個參數是這個樣板引擎的名稱 第二個參數是放入和此樣板引擎相關的設定
// 這裡設定了預設的佈局（default layout）需使用名為 main 的檔案
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 handlebars
app.set('view engine', 'handlebars');

// routes setting
app.get('/', (req,res) => {
    res.render('index', { movies: movieList.results });
})

app.get('/movies/:movie_id', (req, res) => {
    console.log('movie id: ', req.params.id)
    const movieOne = {
        title: 'Jurassic World: Fallen Kingdom',
        image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
        release_date: '2018-06-06',
        description: 'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
    }
    res.render('show', {movie: movieOne})
})

app.listen(port, () => {
    console.log(`the server is listen on http://localhost:${port}`)
})