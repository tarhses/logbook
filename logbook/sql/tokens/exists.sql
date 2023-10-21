SELECT EXISTS(
  SELECT
    TRUE
  FROM
    `token`
  WHERE
    `hash` = ?1
);
