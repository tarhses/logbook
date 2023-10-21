INSERT INTO
  `platform` (`name`)
VALUES
  (?1)
RETURNING
  `id`,
  `name`;
