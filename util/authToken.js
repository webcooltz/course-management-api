// This class sees if you have a token or not. If correct, sets to true

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (authHeader) {
		const token = authHeader && authHeader.split(" ")[1];
		try {
			if (!token) {
				return res.sendStatus(401);
			}
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) {
					return res.sendStatus(403);
				}
				req.user = user;
				next();
			});
		}
		catch (err) {
			res.status(401).json({ message: 'Invalid token' });
		}
	}
	else {
		res.status(401).json({ message: 'No token provided' });
	}
};
