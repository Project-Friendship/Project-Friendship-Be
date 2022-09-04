const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	    response.send("App is running")
})

module.exports = router;