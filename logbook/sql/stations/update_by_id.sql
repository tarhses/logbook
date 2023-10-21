-- What could fail:
-- station not found (0 affected rows)
-- ==> 404 station not found
-- name already in use
-- ==> 400
-- maybe blank name (validation)
-- ==> 400
UPDATE
  `station`
SET
  `name` = ?2
WHERE
  `id` = ?1
RETURNING
  `id` AS `id!`,
  `name`;
