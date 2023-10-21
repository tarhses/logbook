SELECT
  `playthrough`.`id`,
  `playthrough`.`start_date`,
  `playthrough`.`start_date_precision`,
  `playthrough`.`finished`,
  `playthrough`.`comment`,
  `game`.`id` AS `game_id`,
  `game`.`name` AS `game_name`,
  `game`.`release_date` AS `game_release_date`,
  `game`.`finishable` AS `game_finishable`,
  `game`.`igdb_id` AS `game_igdb_id`,
  `game`.`igdb_cover` AS `game_igdb_cover`,
  `platform`.`id` AS `platform_id`,
  `platform`.`name` AS `platform_name`
FROM
  `playthrough`
  JOIN `game` ON `game`.`id` = `playthrough`.`game_id`
  JOIN `platform` ON `platform`.`id` = `playthrough`.`platform_id`
ORDER BY
  `playthrough`.`start_date` DESC
LIMIT
  ?1
OFFSET
  ?2;
