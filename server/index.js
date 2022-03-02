require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ctrl = require("./controller");
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json(""));
app.use(cors());

app.post('/api/users', ctrl.createAccount);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
