const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const myPostRoutes = require('./apiRoutes/mypostRoutes')
const { getComments, createComment } = require('../controllers/CommentController');


router.use('/', apiRoutes);
router.use('/myPosts', myPostRoutes);
router.route('/posts/:postId')
    .get(getComments)
    .post(createComment)


module.exports = router;