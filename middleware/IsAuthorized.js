
function IsAuthorized(req, res, next) {
	const authHeader = req.get('authorization');
	if (!authHeader) return res.status(403).json({ error: 'No credentials sent.' });
	const  [,token] = authHeader.split(" ");




	const r = pool.query('SELECT * FROM TOKEN where expiry > now and token = $1',[token])
	
	console.log(token)
	next();
};

module.exports = { IsAuthorized }


