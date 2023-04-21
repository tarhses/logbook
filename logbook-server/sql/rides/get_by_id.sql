SELECT
  `ride`.`id` AS `ride_id`,
  `ride`.`date`,
  `ride`.`delay`,
  `ride`.`ticket_control`,
  `connection`.`id` AS `connection_id`,
  `connection`.`departure_time`,
  `connection`.`arrival_time`,
  `departure`.`id` AS `departure_id`,
  `departure`.`name` AS `departure_name`,
  `arrival`.`id` AS `arrival_id`,
  `arrival`.`name` AS `arrival_name`
FROM
  `ride`
JOIN
  `connection`
  ON `connection`.`id` = `ride`.`connection_id`
JOIN
  `station`
  AS `departure`
  ON `departure`.`id` = `connection`.`departure_id`
JOIN
  `station`
  AS `arrival`
  ON `arrival`.`id` = `connection`.`arrival_id`
WHERE
  `ride`.`id` = ?1;
