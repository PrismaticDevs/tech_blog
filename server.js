 require('dotenv').config();
 const path = require('path');
 const express = require('express');
 const exphb = require('express-handlebars');
 const session = require('express-session');

 const sequelize = require('./config');
 const routes = require('./routes');


 const hbs = exphb.create({});
 const app = express();
 const PORT = process.env.PORT || 3001;

 const sessionSettings = {
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
 }

 app.engine('handlebars', hbs.engine);
 app.set('view engine', 'handlebars');

 app.use(session(sessionSettings));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(routes);

 sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
 });