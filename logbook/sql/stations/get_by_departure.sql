SELECT
  `station`.`id`,
  `station`.`name`
FROM
  `station`
  JOIN `connection` ON `station`.`id` = `connection`.`arrival_id`
WHERE
  `connection`.`departure_id` = ?1
GROUP BY
  `station`.`id`;
