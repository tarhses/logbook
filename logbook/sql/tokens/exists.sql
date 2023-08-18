SELECT EXISTS(
  SELECT
    1
  FROM
    `token`
  WHERE
    `hash` = ?1
);
