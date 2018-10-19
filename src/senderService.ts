import request from 'request'
import dotenv from 'dotenv'
dotenv.config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
// Sends response messages via the Send API
export function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    }

    sendRequest(request_body);
}

export function sendTypingAction(sender_psid) {
    sendRequest({
        recipient: {
            id: sender_psid,
        },
        sender_action: "typing_on"
    })
}

function sendRequest(request_body) {
    // Send the HTTP request to the Messenger Platform
    request(
        {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: request_body,
        },
        (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error('Unable to send message:' + err)
            }
        }
    )
}   
