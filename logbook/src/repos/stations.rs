use serde::Deserialize;
use sqlx::SqlitePool;

use crate::models::Station;

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StationReq {
    pub name: String,
}

pub async fn get_all(db: &SqlitePool) -> Vec<Station> {
    sqlx::query_file_as!(Station, "sql/stations/get_all.sql")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn get_by_departure(db: &SqlitePool, departure_id: i64) -> Vec<Station> {
    sqlx::query_file_as!(Station, "sql/stations/get_by_departure.sql", departure_id)
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn create(db: &SqlitePool, station: StationReq) -> Station {
    sqlx::query_file_as!(Station, "sql/stations/create.sql", station.name)
        .fetch_one(db)
        .await
        .unwrap()
}

pub async fn update_by_id(db: &SqlitePool, id: i64, station: StationReq) -> Station {
    sqlx::query_file_as!(Station, "sql/stations/update_by_id.sql", id, station.name)
        .fetch_one(db)
        .await
        .unwrap()
}

#[cfg(test)]
mod tests {
    use crate::repos::get_test_db;

    use super::*;

    #[tokio::test]
    async fn get_all_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('Enghien'), ('Tournai');
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_all(&db).await;
        let expected = vec![
            Station {
                id: 1,
                name: String::from("Enghien"),
            },
            Station {
                id: 2,
                name: String::from("Tournai"),
            },
        ];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn get_by_departure_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('Namur'), ('Dinant'), ('Madrid');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 0, 1), (2, 3, 0, 1), (3, 1, 0, 1);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_by_departure(&db, 2).await;
        let expected = vec![Station {
            id: 3,
            name: String::from("Madrid"),
        }];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn get_by_departure_removes_duplicates() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('A'), ('B');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20), (1, 2, 30, 40);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_by_departure(&db, 1).await;
        let expected = vec![Station {
            id: 2,
            name: String::from("B"),
        }];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn create_works() {
        let db = get_test_db().await;
        let actual = create(
            &db,
            StationReq {
                name: String::from("Ljubljana"),
            },
        )
        .await;
        let expected = Station {
            id: 1,
            name: String::from("Ljubljana"),
        };
        let records = sqlx::query!(
            "
            SELECT *
            FROM station
            WHERE id = 1
            AND name = 'Ljubljana'
            "
        )
        .fetch_all(&db)
        .await
        .unwrap();
        assert_eq!(actual, expected);
        assert_eq!(records.len(), 1);
    }

    #[tokio::test]
    async fn update_by_id_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (id, name)
            VALUES (2, 'Pars');
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = update_by_id(
            &db,
            2,
            StationReq {
                name: String::from("Paris"),
            },
        )
        .await;
        let expected: Station = Station {
            id: 2,
            name: String::from("Paris"),
        };
        let records = sqlx::query!(
            "
            SELECT *
            FROM station
            WHERE id = 2
            AND name = 'Paris';
            "
        )
        .fetch_all(&db)
        .await
        .unwrap();
        assert_eq!(actual, expected);
        assert_eq!(records.len(), 1);
    }
}
