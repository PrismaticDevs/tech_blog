const {
    User,
    Comment
} = require('../models');

module.exports = {
    createComment: async(req, res) => {
        if (!req.session.user) {
            res.redirect("/");
        }
        const { text, postId } = req.body;
        if (!text) {
            return res.status(400).json({ error: "You must provide comment text." });
        }
        try {
            console.log(req.body, req.session.user.id);
            const comment = await Comment.create({
                text,
                postId,
                userId: req.session.user.id,
            });
            res.json(comment);
        } catch (error) {
            res.json(error);
        }
    },
    getComments: async(req, res) => {
        try {
            if (!req.session.user) {
                res.redirect('/');
            }
            const commentData = await Comment.findAll({
                where: {
                    userId: req.session.user.id
                },
                include: [{
                    model: User,
                }],
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            const comments = commentData.map(comment => comment.get({ plain: true }));
            res.json(comments)
        } catch (error) {
            console.log(error, 'err', 30);
            res.json(error);
        }
    },
};