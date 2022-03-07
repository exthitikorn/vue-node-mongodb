const express = require('express');
const mongoose = require("mongoose");
const sdp = mongoose.model("sdp");
//line
const line = require('@line/bot-sdk');

// create LINE SDK config from env variables
const config = {
    channelAccessToken: "cYfzKor30wSXJ2zFxWUuWOSVrGoXeEFOZ8tOrVYCaSQNFEyHFfSfaEQuTwX1iizELsc14cJRyDYSvWPgivN65mJGzKfaXRAJmWeeL5GgEpmokonIibB2ZmgaCll7sxMH6ACQTqSQipjDnWBf6GED9wdB04t89/1O/w1cDnyilFU=",
    channelSecret: "a6e65fff4edee9c6edd059836ac28471",
  };

// create LINE SDK client
const client = new line.Client(config);

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  });
  
  // event handler
  function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }

exports.distance_a_sdp = (req, res) => {
    sdp.find(
      {
        loc: {
          $geoWithin: {
            $centerSphere: [[req.params.lng, req.params.lat], 0.3/6378.1],
          },
        },
      },
      (err, sdp) => {
        if (err) res.send(err);
        res.json(sdp);
      }
    );
    };