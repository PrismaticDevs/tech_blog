const {
    User
} = require('../models');

module.exports = {
    createUser: async(req, res) => {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                return res.status(400).json({ error: "You must provide an email, username, and password" });
            }
            const user = await User.create({
                username,
                email,
                password,
            });

            req.session.save(() => {
                req.session.user = user;
            });
            console.log(user.id);
            console.log(req.session.user.id);
            res.redirect('/posts')
        } catch (error) {
            res.json(error);
        }
    },
    getAllUsers: async(req, res) => {
        try {
            const usersData = await User.findAll({});
            const users = usersData.map(user => user.get({ plain: true }));
            res.render('allUsers', {
                users,
            });
        } catch (error) {
            res.json(e);
        }
    },
    getUserById: async(req, res) => {
        try {
            req.session.save(() => {
                if (req.session.visitCount) {
                    req.session.visitCount++;
                } else {
                    req.session.visitCount = 1;
                }
            });
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({ plain: true });
            res.render('singleUser', {
                user,
                visitCount: req.session.visitCount,
            });
        } catch (e) {
            res.json(e);
        }
    },
    login: async(req, res) => {
        try {
            //	first find the user with the given email address
            const userData = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const userFound = userData.get({ plain: true });
            //	check if the password from the form is the same password as the user found
            //	with the given email
            //	if that is true, save the user found in req.session.user
            if (userFound.password === req.body.password) {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.user = userFound;
                    res.json(req.session.user.username + " successfully logged in");
                });
            } else {
                res.json({ error: "Invalid login credentials" })
            }
        } catch (e) {
            console.log(e);
            res.json('Failed login');
        }
    },
    signupHandler: async(req, res) => {
        const { email, username, password } = req.body;
        try {
            const createdUser = await User.create({
                email,
                username,
                password,
            });
            const user = createdUser.get({ plain: true });
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = user;
                res.redirect('/todos');
            });
        } catch (e) {
            res.json(e);
        }
    },
    loginView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }
        res.render('login');
    },
    signupView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }
        res.render('signUp');
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    },
};