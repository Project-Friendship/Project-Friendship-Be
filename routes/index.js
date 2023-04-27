const express = require('express');
const dotenv = require("dotenv").config();
var bodyParser = require('body-parser');
const { Pool } = require('pg');

/* Main program */

console.log(`Starting pf-server`);

const lib = require('../mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const {
  DBHOST: host,
  USER_NAME: user,
  PASSWORD: password,
  DBNAME: database,
  SCHEMA: schema = "pf",
  DBPORT: port = 5432
} = process.env;

console.log({ host, user, password, database, schema, port })
const pool = new Pool({ user, password, host, database, port, });

pool.on('connect', client => {
  console.log("on-connect fired")
  client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${database} on ${host}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = pool;