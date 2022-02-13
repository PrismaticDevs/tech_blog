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
    .get(createPostView)
    .post(createPost)

router.get('/:postId', getSinglePost)

router.get('/myposts', getMyPosts, )

router.patch('/:postId', editPost)

module.exports = router;