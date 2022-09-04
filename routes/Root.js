const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
	    response.send("App is running")
})

module.exports = router;