const express = require('express');
const router = express.Router();
const pool = require('./index');
const { IsAuthorized } = require('../middleware/IsAuthorized');

// delete session key
router.delete('/:email/:sid', (request, response) => {
	const { email, sid } = request.params;
	console.log(`Got request to delete previously created sessions, will remove ${sid}, ${email} from session table if exists`);
	pool.query('DELETE FROM SESSIONS WHERE sid = $1 OR email = $2', [sid, email])
		.then(res => {
			console.log('DB response: ' + JSON.stringify(res.rows));
			response.sendStatus(200)
		})
		.catch(err => setImmediate(() => { throw err; }));
})


router.post('/', (request, response) => {
	console.log(request)
	const { sid, email, notiftoken } = request.body;
	console.log(`Got request to add a session, will add ${sid},${email} to database`);
	pool.query('INSERT INTO sessions (sid, email, notiftoken) VALUES ($1, $2, $3)', [sid, email, notiftoken])
		.then(res => {
			console.log('DB response: ' + JSON.stringify(res.rows));
			response.sendStatus(200)
		})
		.catch(err => setImmediate(() => { throw err; }));
})

router.get('/:sid', (request, response) => {
	console.log(`Got request for email`);
	const { sid } = request.params;
	console.log("Check for sid: " + sid)
	pool.query('SELECT email($1)', [sid])
		.then(res => {
			const [result] = res.rows;
			console.log('DB response: ' + JSON.stringify(result));
			response.send(result);
		})
		.catch(err => setImmediate(() => { throw err }));
})

router.get('/getToken/:email', (request, response) => {
	console.log(`Got request for token given an email`);
	let { email } = request.params;
	console.log("Get token by email: " + email)
	pool.query('SELECT notiftoken from sessions where email = $1', [email])
		.then(res => {
			const [result] = res.rows;
			console.log('DB response: ' + JSON.stringify(result));
			response.send(result);
		})
		.catch(err => setImmediate(() => { throw err; }));
})

// router.put('/cid', (request, response) => {
//     let { cid } = request.body;

// 	console.log("Return all events for given cid: " + cid)
//     pool.query('SELECT * from events_summary WHERE cid = $1', [cid])
// 	.then(res => {
// 	    console.log('DB response: ' + JSON.stringify(res.rows));
// 	    response.send(res.rows);
// 	})
// 	.catch(err =>
// 	       setImmediate(() => {
// 		   throw err;
// 	       }));
// })



module.exports = router;