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
            return res.status(400).json({ error: "You must provide a title and the post-body." });
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
    getComments: async(req, res) => {
        try {
            if (!req.session.user) {
                res.redirect('/');
            }
            const postData = await Post.findAll({
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
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('allPosts', {
                posts,
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            console.log(error, 'err', 30);
            res.json(error);
        }
    },
};