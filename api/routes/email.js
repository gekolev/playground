'use strict';

import axios from "axios"
const { Router } = require('express');
const router = Router();
var FileReader = require('filereader')

let config = {
    "key": "kUojlO-zZCMa_GbPQQM8yA",

    "message": {
        "to": [
            {
                "type": "to",
                "email": "forzametal94@gmail.com"
            }
        ],
        "html": "",
        "subject": "Signup form",
        "autotext": "true",
        "from_name": "Design Dept",
        "from_email": "boris@rebellion7.com",
        "attachments": [
	    ],
    },
}

const contactUrl = "https://mandrillapp.com/api/1.0/messages/send.json"

router.post('/send-email', async (req, res, next) => {
	let emailData = req.body.data

	let resume = req.body.content

	let name = req.body.fileName

	let data = config;

	let html = 
		'<h1>Sign up form</h1><br/>First Name: ' + emailData.firstName +

		'<br/>Email: ' + emailData.email +

		'<br/>Current Design Studio:' + emailData.currentDesignStudio +

		'<br/>Current Title/Position: ' + emailData.currentPosition +

		'<br/>Website: ' + emailData.website +

		'<br/>LinkedIn: ' + emailData.linkedin +

		'<br/>TikTok: ' + emailData.tiktok +

		'<br/>Side Hustles: ' + emailData.sideHustles + '<br/>';

	console.log("logic", emailData.currentPosition, emailData.website,'linkedin', emailData.linkedin, 'tiktok', emailData.tiktok, 'side', emailData.sideHustles);

	data.message.html = html
	data.message.attachments = [{
        "type": 'application/pdf',
        "name": name,
        "content": resume
	}]

	try {
	    await axios.post(contactUrl, data, {
	        headers: {
	            "Content-Type": "application/pdf"
	        }
	    });

	    return Promise.resolve(
	    	res.sendStatus(200)
	    )

	} catch (error) {
		console.log("error", error);
	    return Promise.reject('Something went wrong!!!');
	};

})

module.exports = router;