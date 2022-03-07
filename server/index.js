require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ctrl = require("./controller");
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json(""));
app.use(cors());

// Loads users characters
app.get("/api/characters", ctrl.getAllCharacters);

// Creates user for new users
app.post("/api/users", ctrl.createAccount);

// Gets user info for login
app.get("/api/users", ctrl.getUserInfo);

// Creates character for specific user
app.post("/api/characters", ctrl.createCharacter);

// Deletes character for specific user
app.delete("/api/characters/:id", ctrl.deleteCharacterInfo);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
