-- What could fail:
-- connection not found
-- ==> 404 connection not found
-- date % 24h != 0 (validation, caught in router)
-- maybe delay > X (validation)
-- maybe date > today (validation)
-- ==> 400
INSERT INTO
  `ride` (`connection_id`, `date`, `delay`, `ticket_control`)
VALUES
  (?1, ?2, ?3, ?4);
