CREATE DATABASE bcrew;
USE bcrew;

CREATE TABLE cats (
  id INT unsigned NOT NULL auto_increment,
  primary key(id),
  birthdate DATE,
  breed VARCHAR(50),
  imageUrl TEXT,
  name VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  weight FLOAT,
  addedAt TIMESTAMP,
  lastSeenAt TIMESTAMP
);
