const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost,
    getMyPosts
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getAllPosts)
    .post(createPost)

router.route('/:postId')
    .get(getSinglePost)

router.get('/myposts', getMyPosts)

router.patch('/:postId', editPost)

module.exports = router;