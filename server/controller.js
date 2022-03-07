require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  createAccount: (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    let salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);

    sequelize
      .query(
        `
            INSERT INTO users
            (first_name, last_name, username, email, password)
            VALUES
            ('${firstName}', '${lastName}', '${username}', '${email}', '${passwordHash}');
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },
  getUserInfo: async (req, res) => {
    const { username, password } = req.query;
    let userTmp;

    await sequelize
      .query(
        `
      SELECT user_id, username, password
      FROM users
      WHERE username = '${username}';
    `
      )
      .then((dbRes) => {
        userTmp = dbRes[0];
        console.log(`${userTmp[0].user_id}`);
      })
      .catch((err) => console.log(err));

    try {
      const verified = bcrypt.compareSync(password, userTmp[0].password);

      if (verified) {
        delete userTmp[0].password;
        res.status(200).send(userTmp);
      } else {
        res.status(400).send("Wrong password");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createCharacter: async (req, res) => {
    const { accountId, characterName, characterInfo } = req.body;

    await sequelize
      .query(
        `
      INSERT INTO characters
      (account_id, character_name, information)
      VALUES
      (${accountId}, '${characterName}', '${characterInfo}')

      RETURNING *;
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0][0]);
        console.log("created character");
      })
      .catch((error) => console.log(error));
  },
  getAllCharacters: async (req, res) => {
    const { account_id } = req.query;

    await sequelize
      .query(
        `
      SELECT * FROM characters
      WHERE account_id = ${account_id};
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },
  deleteCharacterInfo: async (req, res) => {
    await sequelize
      .query(
        `
      DELETE FROM characters
      WHERE character_id = ${req.params.id}

      RETURNING *;
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },
};
