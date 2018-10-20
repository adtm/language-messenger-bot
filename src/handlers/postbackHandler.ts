import { callSendAPI } from '../senderService'
// Handles messaging_postbacks events
export function handlePostback(sender_psid, received_postback) {
    let response

    // Get the payload for the postback
    let payload = received_postback.payload

    // Set the response based on the postback payload
    if (payload.toLowerCase() === 'start') {
        response = { text: 'Write anything to get started!' }
    } else if (payload === 'yes') {
        response = { text: 'Thanks!' }
    } else if (payload === 'no') {
        response = { text: 'Oops, try sending another image.' }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response)
}
