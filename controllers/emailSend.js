"use strict";
import { ApiClient, TransactionalEmailsApi } from 'sib-api-v3-sdk';
//project_directory/emailBuilder.js
const handleEmailSend = async (req, res) => {
    ApiClient.instance.authentications['api-key'].apiKey = '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';
    // console.log(req.body);
    new TransactionalEmailsApi().sendTransacEmail(
        {
            'subject': 'Hello from the Node SDK!',
            'sender': { 'email': 'api@sendinblue.com', 'name': 'QueryMate' },
            'replyTo': { 'email': req.body.email, 'name': 'Sendinblue' },
            'to': [{ 'name': 'John Doe', 'email': 'example@example.com' }],
            'htmlContent': '<html><body><h1>This is a verification email for request to upadate the details!</h1></body></html>',
            'params': { 'bodyMessage': 'Made just for you!' }
        }
    ).then(function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });
}


// async..await is not allowed in global scope, must use a wrapper
async function main() {
}

main().catch(console.error);


export default { handleEmailSend }