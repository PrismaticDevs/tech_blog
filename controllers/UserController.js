const {
    User
} = require('../models');

module.exports = {
    createUser: async(req, res) => {
        const { username, email, password } = req.body;
        try {
            const user = await User.create({
                username,
                email,
                password,
            });

            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = user;
                req.session.userId = user.id;
                return res.status(200);
            });
        } catch (error) {
            return res.json(error);
        }
    },
    getAllUsers: async(req, res) => {
        try {
            const usersData = await User.findAll({});
            const users = usersData.map(user => user.get({ plain: true }));
            return res.render('allUsers', {
                users,
            });
        } catch (error) {
            return res.json(e);
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
            return res.render('singleUser', {
                user,
                visitCount: req.session.visitCount,
            });
        } catch (e) {
            return res.json(e);
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
                    return res.json(req.session.user.username + " successfully logged in");
                });
            } else {
                return res.json({ error: "Invalid login credentials" })
            }
        } catch (e) {
            console.log(e);
            return res.json('Failed login');
        }
    },
    signupHandler: async(req, res) => {
        const { email, username, password } = req.body;
        try {
            const user = await User.create({
                email,
                username,
                password,
            });
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = createdUser;
                req.session.userId = createdUser.id;
                return res.status(200);
            });
        } catch (e) {
            return res.json(e);
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
            return res.redirect('/');
        });
    },
};