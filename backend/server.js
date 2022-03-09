const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//line
const line = require("@line/bot-sdk");
const restClient = new (require("node-rest-client").Client)();

global.Olt = require("./api/models/oltModel");
global.Pon = require("./api/models/ponModel");
global.Ofccc = require("./api/models/ofcccModel");
global.Sdp = require("./api/models/sdpModel");
global.User = require("./api/models/userModel");
global.Customer = require("./api/models/customerModel");
const oltroutes = require("./api/routes/oltRoutes");
const ponroutes = require("./api/routes/ponRoutes");
const ofcccroutes = require("./api/routes/ofcccRoutes");
const sdproutes = require("./api/routes/sdpRoutes");
const userroutes = require("./api/routes/userRoutes");
const customerroutes = require("./api/routes/customerRoutes");

mongoose.connect("mongodb://localhost/testdb", { useNewUrlParser: true });

// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "cYfzKor30wSXJ2zFxWUuWOSVrGoXeEFOZ8tOrVYCaSQNFEyHFfSfaEQuTwX1iizELsc14cJRyDYSvWPgivN65mJGzKfaXRAJmWeeL5GgEpmokonIibB2ZmgaCll7sxMH6ACQTqSQipjDnWBf6GED9wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "a6e65fff4edee9c6edd059836ac28471",
};

// create LINE SDK client
const client = new line.Client(config);

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.message.type !== "location") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  const apiUrl =
    "https://4c90-2001-fb1-153-fce2-ccd9-4942-f6be-69d.ngrok.io/distance";

  return new Promise((resolve) => {
    restClient.get(
      `${apiUrl}/${event.message.longitude}/${event.message.latitude}`,
      (data) => {
        const locData = [];
        for (let i = 0; i < data.length; i++) {
          locData.push({
            name: data[i].sdp_Name,
            type: data[i].sdp_Type,
          });
        }
        console.log(locData);
        // create a data test
        const pinData = locData.map((row) => (
          {
            "type": "text",
            "text": row.name,
        }
        ));
        resolve(client.replyMessage(event.replyToken, pinData))
      }
    );
  });
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

oltroutes(app);
ponroutes(app);
ofcccroutes(app);
sdproutes(app);
userroutes(app);
customerroutes(app);

const port = process.env.PORT || 3000;
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
