SELECT
  `id` AS `id!`,
  `name`,
  `release_date`,
  `finishable`,
  `igdb_id`,
  `igdb_cover`
FROM
  `game`
ORDER BY
  `name`
LIMIT
  ?1
OFFSET
  ?2;
