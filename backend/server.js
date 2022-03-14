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
    "https://cbf7-2001-fb1-151-b8f4-8542-817-9270-926d.ngrok.io/distance"; //API URL

  return new Promise((resolve) => {
    restClient.get(
      `${apiUrl}/${event.message.longitude}/${event.message.latitude}`,
      (data) => {
        const locData = [];
        
        for (let i = 0; i < data.length; i++) {
          // Difine variable
          var lat1 = event.message.latitude;
          var lng1 = event.message.longitude;
          var lat2 = data[i].loc[1];
          var lng2 = data[i].loc[0];

          // Calaulate distance
          var radlat1 = (Math.PI * lat1) / 180;
          var radlat2 = (Math.PI * lat2) / 180;
          var theta = lng1 - lng2;
          var radtheta = (Math.PI * theta) / 180;
          var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          } else {
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1609.344;
          }
          locData.push({
            _id: data[i]._id,
            name: data[i].sdp_Name,
            type: data[i].sdp_Type,
            lat: data[i].loc[1],
            lng: data[i].loc[0],
            dist: dist.toFixed(0),
          });
        }
      
        //Sort data
        locData.sort(function(a, b){return a.dist - b.dist});

        console.log(locData);

        // create a data test
        const pinData = locData.map((row) => (
          //test
          {
            "thumbnailImageUrl": "https://i.ibb.co/hcM88Yv/58800405-1183115525189846-7696496276770127872-n.png",
            "imageBackgroundColor": "#FFFFFF",
            "title": row.name,
            "text": `ระยะห่าง : ${row.dist}`,
            "actions": [
              {
                "type": "uri",
                "label": "Location",
                "uri": `http://maps.google.com/maps?q=${row.lat},${row.lng}`

              }
            ]
          }
        ));
        // console.log(pinData)
        const msg = {
          "type": "template",
          "altText": "ข้อมูลสถานที่",
          "template": {
            "type": "carousel",
            "columns": pinData,
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
          }
        }
        resolve(client.replyMessage(event.replyToken, msg))
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
