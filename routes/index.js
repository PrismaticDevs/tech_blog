const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const { getMyPosts } = require('../controllers/PostsController');


router.use('/', apiRoutes);
router.get('/myPosts', getMyPosts);


module.exports = router;