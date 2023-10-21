use serde::Deserialize;
use sqlx::SqlitePool;

use crate::models::Platform;

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlatformReq {
    pub name: String,
}

pub async fn get_all(db: &SqlitePool) -> Vec<Platform> {
    sqlx::query_file_as!(Platform, "sql/platforms/get_all.sql")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn create(db: &SqlitePool, platform: PlatformReq) -> Platform {
    sqlx::query_file_as!(Platform, "sql/platforms/create.sql", platform.name)
        .fetch_one(db)
        .await
        .unwrap()
}
