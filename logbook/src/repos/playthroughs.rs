use serde::Deserialize;
use sqlx::SqlitePool;

use crate::models::{DatePrecision, Game, Platform, Playthrough};

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaythroughReq {
    pub game_id: i64,
    pub platform_id: i64,
    pub start_date: i64,
    pub start_date_precision: DatePrecision,
    pub finished: bool,
    pub comment: String,
}

pub async fn get_by_id(db: &SqlitePool, id: i64) -> Option<Playthrough> {
    sqlx::query_file!("sql/playthroughs/get_by_id.sql", id)
        .fetch_optional(db)
        .await
        .unwrap()
        .map(|record| Playthrough {
            id: record.id,
            game: Game {
                id: record.game_id,
                name: record.game_name,
                release_date: record.game_release_date,
                finishable: record.game_finishable,
                igdb_id: record.game_igdb_id,
                igdb_cover: record.game_igdb_cover,
            },
            platform: Platform {
                id: record.platform_id,
                name: record.platform_name,
            },
            start_date: record.start_date,
            start_date_precision: record.start_date_precision.into(),
            finished: record.finished,
            comment: record.comment,
        })
}

pub async fn get_paginated(db: &SqlitePool, limit: i64, offset: i64) -> Vec<Playthrough> {
    sqlx::query_file!("sql/playthroughs/get_paginated.sql", limit, offset)
        .fetch_all(db)
        .await
        .unwrap()
        .into_iter()
        .map(|record| Playthrough {
            id: record.id,
            game: Game {
                id: record.game_id,
                name: record.game_name,
                release_date: record.game_release_date,
                finishable: record.game_finishable,
                igdb_id: record.game_igdb_id,
                igdb_cover: record.game_igdb_cover,
            },
            platform: Platform {
                id: record.platform_id,
                name: record.platform_name,
            },
            start_date: record.start_date,
            start_date_precision: record.start_date_precision.into(),
            finished: record.finished,
            comment: record.comment,
        })
        .collect()
}

pub async fn create(db: &SqlitePool, playthrough: PlaythroughReq) -> i64 {
    let start_date_precision: i64 = playthrough.start_date_precision.into();
    sqlx::query_file!(
        "sql/playthroughs/create.sql",
        playthrough.game_id,
        playthrough.platform_id,
        playthrough.start_date,
        start_date_precision,
        playthrough.finished,
        playthrough.comment,
    )
    .execute(db)
    .await
    .map(|result| result.last_insert_rowid())
    .unwrap()
}
