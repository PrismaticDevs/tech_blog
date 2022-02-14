const router = require('express').Router();
const {
    createComment,
    getAllComments
} = require('../../../controllers/CommentController');

router.route('/')
    .get(getAllComments)
    .post(createComment)

module.exports = router;