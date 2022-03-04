const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//line
const line = require('@line/bot-sdk');
// const ACCESS_TOKEN = "cYfzKor30wSXJ2zFxWUuWOSVrGoXeEFOZ8tOrVYCaSQNFEyHFfSfaEQuTwX1iizELsc14cJRyDYSvWPgivN65mJGzKfaXRAJmWeeL5GgEpmokonIibB2ZmgaCll7sxMH6ACQTqSQipjDnWBf6GED9wdB04t89/1O/w1cDnyilFU=";
// const SECRET_TOKEN = "a6e65fff4edee9c6edd059836ac28471";

global.Olt = require('./api/models/oltModel');
global.Pon = require('./api/models/ponModel');
global.Ofccc = require('./api/models/ofcccModel');
global.Sdp = require('./api/models/sdpModel');
global.User = require('./api/models/userModel');
global.Customer = require('./api/models/customerModel')
const oltroutes = require('./api/routes/oltRoutes');
const ponroutes = require('./api/routes/ponRoutes');
const ofcccroutes = require('./api/routes/ofcccRoutes');
const sdproutes = require('./api/routes/sdpRoutes');
const userroutes = require('./api/routes/userRoutes');
const customerroutes = require('./api/routes/customerRoutes');

mongoose.connect(
    'mongodb://localhost/testdb',
    { useNewUrlParser: true }
)

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

oltroutes(app);
ponroutes(app);
ofcccroutes(app);
sdproutes(app);
userroutes(app);
customerroutes(app);


const port = process.env.PORT || 3000;
app.listen(port);

app.use((req, res)=>{
    res.status(404).send({url: `${req.originalUrl} not found`})
})

console.log(`Server started on port ${port}`);