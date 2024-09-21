import express from "express";
import bodyParser from "body-parser";
import { users } from "./auth.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send('You must be logged in to perform this action');
    }
    next();
});

router.get('/', (req, res) => {
    const allBlogs = users.flatMap(user => user.blogs);
    res.render("all-blogs", { blogs: allBlogs });
});

router.get('/new', (req, res) => {
    res.render("form");
});

router.post('/new', (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }

    const newBlog = {
        id: Date.now().toString(),
        title: req.body.title,
        markdown: req.body.markdown,
        description: req.body.description,
        authorId: user.id
    };

    user.blogs.push(newBlog);
    res.redirect('/articles');
});

router.get('/:id', (req, res) => {
    const blog = users.flatMap(user => user.blogs).find(b => b.id === req.params.id);
    if (blog) {
        res.render("article", { blog: blog });
    } else {
        res.status(404).send("Blog not found");
    }
});

router.get('/:id/edit', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (blog) {
        res.render("edit-blog.ejs", { blog: blog });
    } else {
        res.status(404).send("Blog not found");
    }
});

router.post('/:id/edit', (req, res) => {
    const index = blogs.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        blogs[index] = {
            ...blogs[index],
            title: req.body.title,
            markdown: req.body.markdown,
            description: req.body.description,
        };
        res.redirect('/articles/' + req.params.id);
    } else {
        res.status(404).send("Blog not found");
    }
});

router.post('/:id/delete', (req, res) => {
    blogs = blogs.filter(b => b.id !== req.params.id);
    res.redirect('/articles');
});

export default router;  