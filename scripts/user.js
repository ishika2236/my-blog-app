import express from "express";
import bodyParser from "body-parser";
import { users } from "./auth.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send(`You must be logged in to view this page 
            <a href="/signup">signup  here</a>`);
    }
    next();
});

router.get('/profile', (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render("profile", { user: user });
});

router.post('/profile', (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }

    user.email = req.body.email;
    user.bio = req.body.bio;

    res.redirect('/users/profile');
});

router.get('/my-blogs', (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render("my-blogs", { blogs: user.blogs });
});

export default router;