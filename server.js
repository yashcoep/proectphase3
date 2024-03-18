const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql = require('mssql');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
