use serde::Deserialize;
use sqlx::SqlitePool;

use crate::models::{Connection, Station};

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateConnection {
    departure_id: i64,
    arrival_id: i64,
    departure_time: i64,
    arrival_time: i64,
}

pub async fn get_by_id(db: &SqlitePool, id: i64) -> Option<Connection> {
    sqlx::query_file!("sql/connections/get_by_id.sql", id)
        .fetch_optional(db)
        .await
        .unwrap()
        .map(|record| Connection {
            id: record.connection_id,
            departure: Station {
                id: record.departure_id,
                name: record.departure_name,
            },
            arrival: Station {
                id: record.arrival_id,
                name: record.arrival_name,
            },
            departure_time: record.departure_time,
            arrival_time: record.arrival_time,
        })
}

pub async fn get_by_ends(db: &SqlitePool, departure_id: i64, arrival_id: i64) -> Vec<Connection> {
    sqlx::query_file!("sql/connections/get_by_ends.sql", departure_id, arrival_id)
        .fetch_all(db)
        .await
        .unwrap()
        .into_iter()
        .map(|record| Connection {
            id: record.connection_id,
            departure: Station {
                id: record.departure_id,
                name: record.departure_name,
            },
            arrival: Station {
                id: record.arrival_id,
                name: record.arrival_name,
            },
            departure_time: record.departure_time,
            arrival_time: record.arrival_time,
        })
        .collect()
}

pub async fn create(db: &SqlitePool, connection: CreateConnection) -> i64 {
    sqlx::query_file!(
        "sql/connections/create.sql",
        connection.departure_id,
        connection.arrival_id,
        connection.departure_time,
        connection.arrival_time
    )
    .execute(db)
    .await
    .map(|result| result.last_insert_rowid())
    .unwrap()
}

#[cfg(test)]
mod tests {
    use crate::repos::get_test_db;

    use super::*;

    #[tokio::test]
    async fn get_by_id_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('Enghien'), ('Halle'), ('Gembloux'), ('Schaerbeek');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20), (3, 4, 30, 40);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_by_id(&db, 2).await;
        let expected = Some(Connection {
            id: 2,
            departure: Station {
                id: 3,
                name: String::from("Gembloux"),
            },
            arrival: Station {
                id: 4,
                name: String::from("Schaerbeek"),
            },
            departure_time: 30,
            arrival_time: 40,
        });
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn get_by_id_returns_none_given_nonexistent_id() {
        let db = get_test_db().await;
        let actual = get_by_id(&db, 12).await;
        let expected = None;
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn get_by_ends_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('Chimay'), ('Namur'), ('Antwerpen');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20), (2, 3, 30, 40), (3, 2, 50, 60);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_by_ends(&db, 2, 3).await;
        let expected = vec![Connection {
            id: 2,
            departure: Station {
                id: 2,
                name: String::from("Namur"),
            },
            arrival: Station {
                id: 3,
                name: String::from("Antwerpen"),
            },
            departure_time: 30,
            arrival_time: 40,
        }];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn create_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('A'), ('B');
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = create(
            &db,
            CreateConnection {
                departure_id: 1,
                arrival_id: 2,
                departure_time: 10,
                arrival_time: 20,
            },
        )
        .await;
        let expected = 1;
        let records = sqlx::query!(
            "
            SELECT *
            FROM connection
            WHERE id = 1
            AND departure_id = 1
            AND arrival_id = 2
            AND departure_time = 10
            AND arrival_time = 20;
            "
        )
        .fetch_all(&db)
        .await
        .unwrap();
        assert_eq!(actual, expected);
        assert_eq!(records.len(), 1);
    }
}
