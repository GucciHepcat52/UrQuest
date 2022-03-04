CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(500) NOT NULL
);

CREATE TABLE characters (
  character_id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES users(user_id),
  character_name VARCHAR(50) NOT NULL,
  information VARCHAR(2000)
);
