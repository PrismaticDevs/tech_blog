const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost,
    getMyPosts,
    createPostView
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getAllPosts)

router.route('/create')
    .post(createPostView)

router.route('/:postId')
    .get(getSinglePost)

router.get('/myposts', getMyPosts)

router.patch('/:postId', editPost)

module.exports = router;