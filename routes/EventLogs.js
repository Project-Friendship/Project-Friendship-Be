const express = require('express');
const router = express.Router();
const pool = require('./index');

router.post('/', (request, response) => {
    let { eid, email, duration } = request.body;

	console.log(`Got request to add an event log, 
			will add ${email}'s completed event (# ${eid}) to database`);
    pool.query(
	'INSERT INTO log (eid, mentoremail, duration) VALUES ($1, $2, $3)',
	       [eid, email, duration])
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
    console.log(`Got request to get all log entries of given email`);
	let email = request.body.email;
	console.log("Check log table for: " + email)
    pool.query('SELECT * FROM log where mentoremail = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.delete('/', (request, response) => {
    let lid = request.body.lid;
    console.log(`Got request to delete log under lid: ${lid} from log table.`);
    pool.query('DELETE FROM log WHERE lid = $1', [lid])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.delete('/', (request, response) => {
    let email = request.body.email;
    console.log(`Got request to delete log under email: ${email} from log table.`);
    pool.query('DELETE FROM log WHERE mentoremail = $1', [email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})
module.exports = router;
