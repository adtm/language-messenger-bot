A proof of concept of a Messenger Chatbot teaching new languages to users. The user is specified to choose a language and a scenario he will have to walk through. The chatbot can learn the user's behavior with AI.

### Local development

-   Download ngrok: https://ngrok.com/ or `brew`

-   Set up environment variables:

    -   Check `.env.example` and create `.env` with all the specified values in place
    -   _Project ID_ and _credentials_ can be obtained from the dialogflow and Google Cloud Service dashboard. More on that: https://dialogflow.com/docs/reference/v2-auth-setup

-   Run `npm start / npm run dev` and on an other terminal: `ngrok http 1337` (port)
-   Now paste this link to the Messenger Development platform

## To add a "Get Started" button

```
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type": "call_to_actions",
  "thread_state": "new_thread",
  "call_to_actions": [
    {
      "payload": "Start"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=<PAGE ACCESS TOKEN>"
```
