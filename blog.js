const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();
const path = require('path');
const mysql = require("./Config/configblogDb");
const session = require('express-session');
const loginRouter = require('./LoginRoute/LoginRoute');
const userRoutes = require('./routes/routesUsers');
const postRoutes = require('./routes/routesPosts')
const commentsRoutes = require('./routes/routesComments');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/'); // Redirect to login page if not authenticated
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.get('/home', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.use('/api/users', userRoutes);
app.use('/api', loginRouter);
app.use('/api', postRoutes);
app.use('/api', commentsRoutes);




const PORT = process.env.PORT || 3000;

// Start Server
mysql.query('SELECT 1').then(() => {
    console.log('SQL Connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to Connect SQL:', error);
});
