const router = require('express').Router();
const {
    createComment,
    getComments
} = require('../../../controllers/CommentController');

router.route('/')
    .get(getComments)
    .post(createComment)

module.exports = router;