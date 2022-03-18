const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const axios = require("axios");

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
    "https://2a3d-2001-fb1-150-7889-6d11-b4f9-eb55-3ba2.ngrok.io/distance"; //API URL

  return new Promise((resolve) => {
    // customer
    // restClient.get(
    //   `https://9234-182-52-58-27.ngrok.io/customers/`,
    //   (cus) => {
    //     const customerData = [];
    //     for (let i = 0; i < cus.length; i++) {
    //       customerData.push({
    //         fullname: cus[i].fullname,
    //         tel: cus[i].tel,
    //         sdp: cus[i].sdp,
    //       });
    //     }
    //     // console.log(customerData);
    //   }
    // );
    restClient.get(
      `https://2a3d-2001-fb1-150-7889-6d11-b4f9-eb55-3ba2.ngrok.io/customers/`,
      (cus) => {
        // console.log(cus)

        restClient.get(
          `${apiUrl}/${event.message.longitude}/${event.message.latitude}`,
          (data) => {
            const locData = [];
            const cusData = [];

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
                ofccc: data[i].ofccc.ofccc_Name,
                pon: data[i].ofccc.pon.pon_Name,
                olt: data[i].ofccc.pon.olt.olt_Name,
                dist: dist.toFixed(0),
              });

              cusData.push({
                _id: cus[i]._id,
                fullname: cus[i].fullname,
                tel: cus[i].tel,
                sdp: cus[i].sdp,
              });
            }

            console.log(cusData[1].sdp._id);

            //Sort data
            locData.sort(function(a, b) {
              return a.dist - b.dist;
            });

            // console.log(locData);

            const telData = cusData.map((row) => ({
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Tel. ",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: row.tel,
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            }));
            // console.log(telData);
            // create a data
            const contentsData = locData.map((row) => ({
              type: "bubble",
              header: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: `${row.name} ระยะห่าง ${row.dist} เมตร`,
                    size: "lg",
                    weight: "bold",
                  },
                ],
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูล SDP",
                    size: "lg",
                    align: "center",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "lg",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "baseline",
                        spacing: "sm",
                        contents: [
                          {
                            type: "text",
                            text: "OLT: ",
                            color: "#aaaaaa",
                            size: "sm",
                            flex: 1,
                          },
                          {
                            type: "text",
                            text: row.olt,
                            wrap: true,
                            color: "#666666",
                            size: "sm",
                            flex: 5,
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        spacing: "sm",
                        contents: [
                          {
                            type: "text",
                            text: "PON: ",
                            color: "#aaaaaa",
                            size: "sm",
                            flex: 1,
                          },
                          {
                            type: "text",
                            text: row.pon,
                            wrap: true,
                            color: "#666666",
                            size: "sm",
                            flex: 5,
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        spacing: "sm",
                        contents: [
                          {
                            type: "text",
                            text: "ofccc: ",
                            color: "#aaaaaa",
                            size: "sm",
                            flex: 1,
                          },
                          {
                            type: "text",
                            text: row.ofccc,
                            wrap: true,
                            color: "#666666",
                            size: "sm",
                            flex: 5,
                          },
                        ],
                      },
                      {
                        type: "separator",
                      },
                      {
                        type: "text",
                        text: "ข้อมูลหมายเลข",
                        size: "lg",
                        align: "center",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: telData,
                      },
                    ],
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "Location",
                      uri: `http://maps.google.com/maps?q=${row.lat},${row.lng}`,
                    },
                  },
                ],
                flex: 0,
              },
              styles: {
                header: {
                  backgroundColor: "#A7E2FF",
                },
                footer: {
                  backgroundColor: "#FFFFFF",
                },
              },
            }));
            // console.log(pinData)

            const msg = {
              type: "flex",
              altText: "Flex Message",
              contents: {
                type: "carousel",
                contents: contentsData,
              },
            };
            // console.log(msg)
            resolve(client.replyMessage(event.replyToken, msg));
          }
        );
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
