-- What could fail:
-- ride not found (0 affected rows, caught by following get)
-- ==> 404 ride not found
-- connection not found
-- ==> 404 connection not found
-- date % 24h != 0 (validation, caught in router)
-- maybe delay > X (validation)
-- maybe date > today (validation)
-- ==> 400
UPDATE
  `ride`
SET
  `connection_id` = ?2,
  `date` = ?3,
  `delay` = ?4,
  `ticket_control` = ?5
WHERE
  `id` = ?1;
