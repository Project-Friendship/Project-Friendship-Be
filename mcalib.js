const path = require('path');
var os = require('os');
const fs = require('fs');

var ePrefix = '';  // label for error messages

// set label for error messages
// 1 arg:  string label
//     if  string  is a file path, replace by immediate parent dir/filename

function setErrorPrefix(string) {
    const sep = new RegExp("\\"+path.sep);
    const parentDirs = new RegExp(".*\\"+path.sep);
    if (string.match(sep)) { // contains a path separator
	ePrefix = path.dirname(string).replace(parentDirs, "") +
	    path.sep + path.basename(string);
    } else
	ePrefix = string;
    ePrefix +=  ": ";
}

// 1 or 2 arguments:  string name of database host, optional .pgpass file path
//    default filepath is ~/.pgpass

function getPGPassword(dbHost, filepath) {
    try {
	var pgpassFile = filepath;
	if (filepath == undefined)
	    pgpassFile = os.homedir() + "\\" + path.sep + ".pgpass";
	var pgpassArr = fs.readFileSync(pgpassFile, 'utf8').split("\n");
    } catch (err) {
	throw new Error(`${ePrefix}Could not open ${pgpassFile}\n${err}`);
    }
    
    const dbHostRE = new RegExp("^" + dbHost + ":.*");
    // dbHostRE matches first line that begins with dbHost

    for (var i=0;  i < pgpassArr.length;  i++)
	if (pgpassArr[i].match(dbHostRE))
	    break;
    if (i == pgpassArr.length) {
	throw new Error(
	    `\n${ePrefix}Could not find a line for ${dbHost} in ${pgpassFile}`);
    }
    
    return pgpassArr[i].replace(/^.*:/, "");
    
}

// returns array of IP addresses for this computer 

function getIPAddresses() {
    
    try {
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
	    for (var k2 in interfaces[k]) {
		var address = interfaces[k][k2];
		if (address.family === 'IPv4' && !address.internal) {
		    addresses.push(address.address);
		}
	    }
	}
    } catch (err) {
	throw new Error(`\n${ePrefix}Error getting IP addresses\n${err}`);
    }	
	
    return addresses;
}

module.exports = { setErrorPrefix, getPGPassword, getIPAddresses };
