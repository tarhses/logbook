INSERT INTO
  `game` (`name`, `release_date`, `finishable`, `igdb_id`, `igdb_cover`)
VALUES
  (?1, ?2, ?3, ?4, ?5)
RETURNING
  `id`,
  `name`,
  `release_date`,
  `finishable`,
  `igdb_id`,
  `igdb_cover`;
