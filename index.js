import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import articleRoute from "./scripts/article.js";
import userRoute from "./scripts/user.js";
import authRoute from "./scripts/auth.js";

const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.set('view engine', 'ejs');

app.use('/articles', articleRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

const port = 8000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.render("index", { user: req.session.userId ? { id: req.session.userId } : null });
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.get('/login', (req, res) => {
    res.render("login");
});
app.get('/form', (req, res) => {
    res.render("form");
});

app.get('/article', (req, res) => {
    res.render("article");
});

app.get('/profile', (req, res) => {
    res.render("profile");
});

app.get('/my-blogs', (req, res) => {
    res.render("my-blogs");
});

app.post('/form', (req, res) => {
    console.log("Form submitted");
    // Handle form submission
});

app.post('/', (req, res) => {
    console.log('Received POST request to /');
    var artData = {
        t: req.body["title"],
        m: req.body.markdown,
        d: req.body.description,
    }
    res.render("all-blogs", { artData: artData });
});

// Add this for debugging
console.log("Server setup complete");