// left as an example for how to manage a login

const mongodb = require('../db/connect');
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await mongodb.getDb().db().collection('users').find({ email: email });
	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// const passwordMatch = await bcrypt.compare(password, user.password);
	// if (!passwordMatch) {
	// 	return res.status(401).json({ message: "Invalid email or password" });
	// }

	const accessToken = jwt.sign(loginInfo, process.env.ACCESS_TOKEN_SECRET);
	res.status(201).json({ accessToken: accessToken });
};
