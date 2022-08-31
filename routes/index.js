const express = require('express');

var bodyParser = require('body-parser');
const { Pool } = require('pg');

/* Main program */

console.log(`Starting pf-server`);

const lib = require('../mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "anansi.stolaf.edu";
const user = 'khan6';    // CHANGE to your username, e.g., jones1
const password = lib.getPGPassword(dbHost);  // uncomment for Windows
const dbName = 'mca_f21';
const schema = 'pf';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({
    user: user,
   password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});

pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${dbName} on ${dbHost}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = pool;