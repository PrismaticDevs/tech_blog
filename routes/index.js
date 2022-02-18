const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const { getMyPosts } = require('../controllers/PostsController');
const { getComments, createComment } = require('../controllers/CommentController');


router.use('/', apiRoutes);
router.get('/myPosts', getMyPosts);
router.route('/posts/:postId')
    .get(getComments)
    .post(createComment)


module.exports = router;

//comment routes