const express = require('express');
const router = express.Router();
const pool = require('./index');

// delete session key
router.delete('/', (request, response) => {
    let email = request.body.email;
	let sid = request.body.sid;

    console.log(`Got request to delete previously created sessions, will remove ${sid}, ${email} from session table if exists`);
    pool.query('DELETE FROM SESSIONS WHERE sid = $1 OR email = $2', [sid, email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})


router.post('/', (request, response) => {
    let sid = request.body.sid;
    let email = request.body.email;

	console.log(`Got request to add a session, will add ${sid},${email} to database`);
    pool.query('INSERT INTO sessions (sid, email) VALUES ($1, $2)',
	       [sid, email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/', (request, response) => {
    console.log(`Got request for email`);
    let sid = request.body.sid;
	console.log("Check for sid: " + sid)
    pool.query('SELECT email($1)', [sid])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;
