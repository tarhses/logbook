pub mod connections;
pub mod rides;
pub mod stations;
pub mod tokens;

#[cfg(test)]
pub(crate) async fn get_test_db() -> sqlx::SqlitePool {
    let db = sqlx::SqlitePool::connect("sqlite::memory:").await.unwrap();
    sqlx::query(include_str!("../migrations/0_init.sql"))
        .execute(&db)
        .await
        .unwrap();
    db
}
