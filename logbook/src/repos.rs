pub mod connections;
pub mod games;
pub mod platforms;
pub mod playthroughs;
pub mod rides;
pub mod stations;
pub mod tokens;

#[cfg(test)]
pub(crate) async fn get_test_db() -> sqlx::SqlitePool {
    let db = sqlx::SqlitePool::connect("sqlite::memory:").await.unwrap();
    sqlx::query(include_str!("../migrations/000_system.sql"))
        .execute(&db)
        .await
        .unwrap();
    sqlx::query(include_str!("../migrations/010_train.sql"))
        .execute(&db)
        .await
        .unwrap();
    sqlx::query(include_str!("../migrations/020_game.sql"))
        .execute(&db)
        .await
        .unwrap();
    db
}
