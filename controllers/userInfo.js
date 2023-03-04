// left as an example for how to manage a login

const users = require("../model/user");

exports.getInfo = (req, res, next) => {
	data = users.users.filter((user) => user.email === req.user.email);
	delete data[0].password;
	res.status(200).json(data[0]);
};