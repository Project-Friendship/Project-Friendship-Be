const express = require('express');
const router = express.Router();
const pool = require('./index');


/*
	CHILDRELATIONSHIP Route
*/

/**
 * @swagger  
 * /childrs:
 *  get:
 *    description: returns all relationships
 *    responses:
 *      '200':
 *        description: all child relationships returned
 */

router.get('/', (request, response) => {
    pool.query('SELECT * FROM childrelationship')
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err => setImmediate(() => { throw err; })); })

/**
 * @swagger  
 * /child/childrs:
 *  post:
 *    description: Posts a relationshp between a given child profile and user profile
 *    parameters:
 *    - name: cid
 *      description: child ID of profile to create a relationship for 
 *      in: formData
 *      required: true
 *      type: int
 *    - name: email
 *      description: email of the user to add to realtionship with child
 *      in: formData
 *      required: true
 *      type: String
 *    - name: isParent
 *      description: boolean to describe if the user profile is parent of child profile
 *      in: formData
 *      required: true
 *      type: Boolean
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', (request, response) => {
	let { cid, email, isParent } = request.body;

	console.log(`Got request to add a realtionship with child ${cid}, 
        will add ${email} to database table childrelationship`);
    pool.query('INSERT INTO childrelationship (cid, email, isparent) VALUES ($1, $2, $3)',
	       [cid, email, isParent])
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
    let email = request.body.email;
	console.log("Retrive all realtionships for email: " + email)
    pool.query('SELECT * from childrelationship WHERE email = $1', [email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/findMentorEmail', (request, response) => {
    let cid = request.body.cid;
	let isParent = '0';
	console.log("Retrive mentor email for given cid: " + cid)
    pool.query('SELECT email from childrelationship WHERE cid = $1 and isparent = $2', [cid, isParent])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows[0]));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/findParentEmail', (request, response) => {
    let cid = request.body.cid;
	let isParent = '1';
	console.log("Retrive parent emails for given cid: " + cid)
    pool.query('SELECT email from childrelationship WHERE cid = $1 and isparent = $2', [cid, isParent])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/checkDuplicateRS', (request, response) => {
    let {cid, email} = request.body;
	
	console.log("Retrive mentor for given cid: " + cid)
    pool.query('SELECT * from childrelationship WHERE cid = $1 and email = $2', [cid, email])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

router.put('/notify', (request, response) => {
    let { email, cid } = request.body;
	console.log("Retrive all emails to notify for: " + email)
    pool.query('SELECT email from childrelationship WHERE cid = $2 and email != $1', [email,cid])
	.then(res => {
	    console.log('DB response: ' + JSON.stringify(res.rows));
	    response.send(res.rows);
	})
	.catch(err =>
	       setImmediate(() => {
		   throw err;
	       }));
})

module.exports = router;