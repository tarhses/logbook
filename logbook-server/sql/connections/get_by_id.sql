SELECT
  `connection`.`id` AS `connection_id`,
  `connection`.`departure_time`,
  `connection`.`arrival_time`,
  `departure`.`id` AS `departure_id`,
  `departure`.`name` AS `departure_name`,
  `arrival`.`id` AS `arrival_id`,
  `arrival`.`name` AS `arrival_name`
FROM
  `connection`
JOIN
  `station`
  AS `departure`
  ON `departure`.`id` = `connection`.`departure_id`
JOIN
  `station`
  AS `arrival`
  ON `arrival`.`id` = `connection`.`arrival_id`
WHERE
  `connection`.`id` = ?1;
