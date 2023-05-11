const express = require('express');
const { IsAuthorized } = require('../middleware/IsAuthorized');
const router = express.Router();

router.get('/', IsAuthorized, IsAdmin, (request, response) => {
	response.send("App is running")
})

module.exports = router;