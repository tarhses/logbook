INSERT INTO
  `station` (`name`)
VALUES
  (?1)
RETURNING
  `id`,
  `name` AS `name!`;
