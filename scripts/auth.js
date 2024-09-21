import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// In-memory user storage (replace with a database in a real app)
let users = [];

router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).send('Username already exists');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            email,
            blogs: []
        };
        users.push(newUser);

        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        // Set user session
        req.session.userId = user.id;
        res.redirect('/');
    } else {
        res.status(400).send('Invalid username or password');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out, please try again');
        }
        res.redirect('/');
    });
});

export { users };
export default router;