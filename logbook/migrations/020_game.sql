CREATE TABLE `game` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT UNIQUE NOT NULL,
  `release_date` INTEGER,
  `finishable` BOOLEAN NOT NULL,
  `igdb_id` INTEGER UNIQUE,
  `igdb_cover` TEXT
);

CREATE TABLE `platform` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT UNIQUE NOT NULL
);

CREATE TABLE `playthrough` (
  `id` INTEGER PRIMARY KEY,
  `game_id` INTEGER NOT NULL REFERENCES `game`,
  `platform_id` INTEGER NOT NULL REFERENCES `platform`,
  `start_date` INTEGER NOT NULL,
  `start_date_precision` INTEGER NOT NULL,
  `finished` BOOLEAN NOT NULL,
  `comment` TEXT NOT NULL

  CHECK (`start_date_precision` BETWEEN 0 AND 3)
);

CREATE TRIGGER `check_unfinishable_game_playthrough_insertion`
BEFORE INSERT ON `playthrough`
WHEN
  NEW.`finished`
  AND EXISTS(
    SELECT
      TRUE
    FROM
      `game`
    WHERE
      `id` = NEW.`game_id`
      AND NOT `finishable`
  )
BEGIN
  SELECT RAISE(ABORT, 'an unfinishable game cannot be finished');
END;

CREATE TRIGGER `check_unfinishable_game_playthrough_update`
BEFORE UPDATE OF `finished` ON `playthrough`
WHEN
  NEW.`finished`
  AND EXISTS(
    SELECT
      TRUE
    FROM
      `game`
    WHERE
      `id` = NEW.`game_id`
      AND NOT `finishable`
  )
BEGIN
  SELECT RAISE(ABORT, 'an unfinishable game cannot be finished');
END;
