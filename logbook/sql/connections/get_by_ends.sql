SELECT
  `connection`.`id` AS `id!`,
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
  ON `departure`.`id` = ?1
JOIN
  `station`
  AS `arrival`
  ON `arrival`.`id` = ?2
WHERE
  `connection`.`departure_id` = ?1
  AND `connection`.`arrival_id` = ?2;
