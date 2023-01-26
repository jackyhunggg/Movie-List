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
// 用movie_id這個變數來當作電影路由
app.get('/movies/:movie_id', (req, res) => {
// locate the movie id first
    console.log('movie id: ', typeof(req.params.movie_id));
// movies.json(app.js/: 8)'s movie's id, and turn it into string, check if it matches the parameter(movie_id)
// 使用 filter() 的時候一般是因為我們需要尋找多個元素，因為 filter() 會回傳一個陣列
// 但因為 movie.id 是不重複的，所以我們每次只會找到唯一有相同 movid.id 的電影
// 這個時候，使用 find 會更適合，我們也可以直接回傳 movie 而不是 movie[0]，讓程式碼變得更簡潔
// because find method will return the first element that passes the test
    const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id);
// the first movie is just a name for this function, the other movie is the movie we const above
    res.render('show', {movie: movie})
})

app.get('/search', (req, res) => {
    // 使用者在瀏覽器所輸入的搜尋內容，會在終端機顯示出來，並且被放在 req.query.keyword 當中
    const keyword = req.query.keyword;
    // 從movieList的每個電影標題篩選關鍵字
    // 若要篩選陣列，就是透過 filter 這個方法
    // 如果要查詢某一字串中是否包含特定字串，則可以使用 includes 這個方法
    // filter function 不會區分大小寫，但是includes會，所以加上toLowerCase來統一結果
    const movies = movieList.results.filter(movie => {
        return movie.title.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', {movies: movies, keyword: keyword})
})

app.listen(port, () => {
    console.log(`the server is listen on http://localhost:${port}`)
})