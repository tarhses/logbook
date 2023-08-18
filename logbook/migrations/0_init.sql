CREATE TABLE `station` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT UNIQUE NOT NULL
);

CREATE TABLE `connection` (
  `id` INTEGER PRIMARY KEY,
  `departure_id` INTEGER NOT NULL REFERENCES `station`,
  `arrival_id` INTEGER NOT NULL REFERENCES `station`,
  `departure_time` INTEGER NOT NULL,
  `arrival_time` INTEGER NOT NULL

  CHECK (`departure_id` <> `arrival_id`),
  CHECK (`departure_time` <> `arrival_time`),
  UNIQUE (`departure_id`, `arrival_id`, `departure_time`, `arrival_time`)
);

CREATE TABLE `ride` (
  `id` INTEGER PRIMARY KEY,
  `connection_id` INTEGER NOT NULL REFERENCES `connection`,
  `date` INTEGER NOT NULL,
  `delay` INTEGER NOT NULL,
  `ticket_control` BOOLEAN NOT NULL
);

CREATE TABLE `token` (
  `hash` BLOB PRIMARY KEY,
  `name` TEXT NOT NULL
);
