 const path = require('path');
 const express = require('express');
 const sequelize = require('./config');
 const routes = require('./controllers');

 const app = express();
 const PORT = process.env.PORT || 3001;

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(routes);

 sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
 });