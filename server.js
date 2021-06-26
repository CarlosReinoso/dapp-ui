const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const knex = require("knex")(require("./knexfile")["development"])

const Transaction = require("./models/transactions");

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//build
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


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
