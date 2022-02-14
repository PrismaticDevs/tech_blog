const {
    Post,
    Comment
} = require('../models');

module.exports = {
    createComment: async(req, res) => {
        if (!req.session.user) {
            res.redirect("/");
        }
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "You must provide comment text." });
        }
        try {
            const comment = await Comment.create({
                text,
                userId: req.session.user.id
            });
            res.status(200).json(post);
        } catch (error) {
            res.json(error);
        }
    },
    getAllComments: async(req, res) => {
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