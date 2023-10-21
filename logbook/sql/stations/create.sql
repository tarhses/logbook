-- What could fail:
-- name already in use
-- ==> 400
-- maybe blank name (validation)
-- ==> 400
INSERT INTO
  `station` (`name`)
VALUES
  (?1)
RETURNING
  `id`,
  `name`;
