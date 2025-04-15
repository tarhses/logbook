use sha2::{Digest, Sha256};
use sqlx::SqlitePool;

pub async fn exists(db: &SqlitePool, token: &[u8]) -> bool {
    let hash: Vec<u8> = Sha256::digest(token).to_vec();
    sqlx::query_file_scalar!("sql/tokens/exists.sql", hash)
        .fetch_one(db)
        .await
        .map(|scalar| scalar == 1)
        .unwrap()
}

#[cfg(test)]
mod tests {
    use crate::repos::get_test_db;

    use super::*;

    /// Create a token for the string "hello".
    async fn create_test_token(db: &SqlitePool) {
        sqlx::query!(
            "
            INSERT INTO `token` (`hash`, `name`)
            VALUES (x'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', '')
            "
        )
        .execute(db)
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn exists_works() {
        let db = get_test_db().await;
        create_test_token(&db).await;
        let actual = exists(&db, b"hello").await;
        let expected = true;
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn exists_returns_false_given_nonexistent_token() {
        let db = get_test_db().await;
        create_test_token(&db).await;
        let actual = exists(&db, b"bonjour").await;
        let expected = false;
        assert_eq!(actual, expected);
    }
}
