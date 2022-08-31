const express = require('express');

var bodyParser = require('body-parser');
const { Pool } = require('pg');

/* Main program */

console.log(`Starting pf-server`);

const lib = require('../mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const host = process.env.DBHOST
const user = process.env.USER;    // CHANGE to your username, e.g., jones1
const password = process.env.PASSWORD;  // uncomment for Windows
const database = process.env.DBNAME;
const schema = 'pf';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({user,password,host,database,port: 5432,});

pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${database} on ${host}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = pool;