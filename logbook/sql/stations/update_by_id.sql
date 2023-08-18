UPDATE
  `station`
SET
  `name` = ?2
WHERE
  `id` = ?1
RETURNING
  `id` AS `id!`,
  `name`;
