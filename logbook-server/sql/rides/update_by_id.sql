UPDATE
  `ride`
SET
  `connection_id` = ?2,
  `date` = ?3,
  `delay` = ?4,
  `ticket_control` = ?5
WHERE
  `id` = ?1;
