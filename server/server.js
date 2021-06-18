const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const port = 3010;

app.use(cors());
app.use(express.json());

app.get("/swap", (req, res) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "74305db0-a6cc-4656-87f6-8a47492b5187",
        },
      }
    )
    .then((axiosRes) => {
        console.log('axiosRes', axiosRes)
        
      res.send(axiosRes.data);
    })
    .catch((error) => {
      console.error(error);
    });

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
