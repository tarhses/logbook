-- What could fail:
-- not unique
-- ==> 400
-- departure_id == arrival_id
-- ==> 400
-- departure_time == arrival_time
-- ==> 400 (this constraint should be removed actually)
-- departure not found
-- arrival not found
-- ==> 404 station not found
-- departure time >= arrival time (validation)
-- ==> NOPE: not correct if a train arrives after midnight
-- departure_time > 23:59 (validation)
-- arrival_time > 23:59 (validation)
-- ==> 400
INSERT INTO
  `connection` (`departure_id`, `arrival_id`, `departure_time`, `arrival_time`)
VALUES
  (?1, ?2, ?3, ?4);
