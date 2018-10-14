### Local development

- Download ngrok: https://ngrok.com/ or `brew`
- Run `npm start / npm run dev` and on an other terminal: `ngrok http 1337` (port)

- Now paste this link to the Messenger Development platform


Heroku link: https://messenger-weboock.herokuapp.com/webhook
Verification token: random123

### Connecting to dialogflow

To connect to dialogFlow agent you need to have security certificate and point to it in your environment. You also need a project id under which the agent runs.

### NLP

To enable NLP in Facebook, you must go to Facebook Developer page and to "Messenger Settings", by scrolling to the bottom under the "Built-In-NLP" decide a page from which you will link your page.

If wanted, you can enable "Advanced Settings":


NLP result example:

```json
{
  "entities": {
    "datetime": [
      {
        "confidence": 0.96494166666667,
        "values": [
          {
            "value": "2018-07-05T16:00:00.000+03:00",
            "grain": "hour",
            "type": "value"
          }
        ],
        "value": "2018-07-05T16:00:00.000+03:00",
        "grain": "hour",
        "type": "value"
      }
    ],
    "sentiment": [
      {
        "confidence": 0.59301154950735,
        "value": "neutral"
      }
    ],
    "bye": [
      {
        "confidence": 0.61518204777792,
        "value": "true"
      }
    ],
    "greetings": [
      {
        "confidence": 0.78910905105147,
        "value": "true"
      }
    ]
  }
}
```

for more NLP result parameters: https://developers.facebook.com/docs/messenger-platform/built-in-nlp