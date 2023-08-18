UPDATE
  `connection`
SET
  `departure_id` = ?2,
  `arrival_id` = ?3,
  `departure_time` = ?4,
  `arrival_time` = ?5
WHERE
  `id` = ?1;
