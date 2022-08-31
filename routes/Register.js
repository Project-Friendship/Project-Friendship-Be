const express = require('express');
const router = express.Router();
const pool = require('./index');

router.post('/', (request, response) => {
	let { email, fname, lname, phone, role, pronouns } = request.body;

	console.log(`Got request to register, will add ${fname} ${lname} to database table registerRequests`);
    pool.query('INSERT INTO registerRequests (email, fname, lname, role, phone, pronouns) VALUES ($1, $2, $3, $4, $5, $6)',
	       [email, fname, lname, role, phone, pronouns])
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
    console.log(`Got request to delete previously created sessions, will remove ${email} from registerrequests table if exists`);
    pool.query('DELETE FROM registerrequests WHERE email = $1', [email])
	.then(res => {
	    console.log('DB response: ' + res.rows[0]);
	    response.sendStatus(200)
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.get('/', (request, response) => {
    pool.query('SELECT * FROM registerRequests')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/', (request, response) => {
    console.log(`Got request to check if email exists`);
	let email = request.body.email;
	console.log("Check for email: " + email)
    pool.query('SELECT * FROM registerRequests where email = ($1)', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows[0]);
	}).catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;

