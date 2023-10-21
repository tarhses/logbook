-- What could fail:
-- connection not found (0 affected rows, caught by following get)
-- ==> 404 connection not found
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
UPDATE
  `connection`
SET
  `departure_id` = ?2,
  `arrival_id` = ?3,
  `departure_time` = ?4,
  `arrival_time` = ?5
WHERE
  `id` = ?1;
