const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
require("dotenv").config();
// const knex = require("knex")(require("./knexfile")["development"])

const Transaction = require("./models/transactions");

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

//whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://mysterious-coast-49077.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions));
app.use(express.json());

//build

if( process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });

}




//test
// app.get('/swap', (req, res) => {
//   knex
//   .select('*')
//   .from('transactions')
//   .then(data => {

//     res.json(data)
//   })
//   .catch(err => err.send('Error getting transactions'))
// })

app.get("/swap", (_req, res) => {
  Transaction.fetchAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      err.status(400).json({ message: "Error getting transactions" })
    );
});

app.post("/swap", (req, res) => {
  new Transaction({
    base_coin: req.body.base_coin,
    swap_coin: req.body.swap_coin,
    base_input: req.body.base_input,
    swap_input: req.body.swap_input,
    base_calc: req.body.base_calc,
    swap_calc: req.body.swap_calc,
  })
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
