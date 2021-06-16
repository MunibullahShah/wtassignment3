const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

var cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const jsonObject = [


  {
    "name": "irfan",
    "email": "afsajj@gmac.com",
    "phone_number": ["3232", "32324423"],
    "gender": "Male",
    "course_code": "MT323",
    "address": {
      "country": "pakistan",
      "city": "lahore",
      "street_address": "not known"
    },
    "id": "0"
  },
];

let startID = jsonObject.length;


app.get("/faculty", function (req, res) {
  return res.json(jsonObject);
});

app.post("/faculty", function (req, res) {
  console.log();
  jsonObject.push(req.body);
  jsonObject[jsonObject.length - 1].id = startID++;
  res.send(jsonObject);
});

app.get("/faculty/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index)
      return res.json(jsonObject[index]);
  }
  return res.status(404).send("Record not found");
});

app.put("/faculty/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index) {
      var keys = Object.keys(req.body);
      for (let key = 0; key < keys.length; key++) {
        jsonObject[index][keys[key]] = req.body[keys[key]];
      }
      return res.json(jsonObject[index]);
    }
  }
  return res.status(404).send("Failed to update, record not found.");
});

app.delete("/faculty/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index) {
      jsonObject.splice(index, 1);
      return res.status(200).send("Removed!");
    }
  }
  return res.status(200).send("Removed.");
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 2500;

app.listen(PORT, () => {
  console.log(`running at PORT ${PORT}`);
});


