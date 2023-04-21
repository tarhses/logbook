use serde::Deserialize;
use sqlx::SqlitePool;

use crate::models::{Connection, Ride, Station};

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateRide {
    pub connection_id: i64,
    pub date: i64,
    pub delay: i64,
    pub ticket_control: bool,
}

pub async fn get_by_id(db: &SqlitePool, id: i64) -> Option<Ride> {
    sqlx::query_file!("sql/rides/get_by_id.sql", id)
        .fetch_optional(db)
        .await
        .unwrap()
        .map(|record| Ride {
            id: record.ride_id,
            connection: Connection {
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
            },
            date: record.date,
            delay: record.delay,
            ticket_control: record.ticket_control,
        })
}

pub async fn get_paginated(db: &SqlitePool, limit: i64, offset: i64) -> Vec<Ride> {
    sqlx::query_file!("sql/rides/get_paginated.sql", limit, offset)
        .fetch_all(db)
        .await
        .unwrap()
        .into_iter()
        .map(|record| Ride {
            id: record.ride_id,
            connection: Connection {
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
            },
            date: record.date,
            delay: record.delay,
            ticket_control: record.ticket_control,
        })
        .collect()
}

pub async fn create(db: &SqlitePool, ride: CreateRide) -> i64 {
    sqlx::query_file!(
        "sql/rides/create.sql",
        ride.connection_id,
        ride.date,
        ride.delay,
        ride.ticket_control
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
            VALUES ('A'), ('B');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20), (2, 1, 30, 40);
            INSERT INTO ride (connection_id, date, delay, ticket_control)
            VALUES (1, 1, 0, FALSE), (2, 2, 60000, TRUE);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_by_id(&db, 2).await;
        let expected = Some(Ride {
            id: 2,
            connection: Connection {
                id: 2,
                departure: Station {
                    id: 2,
                    name: String::from("B"),
                },
                arrival: Station {
                    id: 1,
                    name: String::from("A"),
                },
                departure_time: 30,
                arrival_time: 40,
            },
            date: 2,
            delay: 60000,
            ticket_control: true,
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
    async fn get_paginated_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('A'), ('B'), ('C'), ('D');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20), (2, 1, 30, 40);
            INSERT INTO ride (connection_id, date, delay, ticket_control)
            VALUES (1, 4, 20, TRUE), (1, 3, 15, TRUE), (2, 2, 10, FALSE), (1, 1, 5, TRUE);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_paginated(&db, 2, 1).await;
        let expected = vec![
            Ride {
                id: 2,
                connection: Connection {
                    id: 1,
                    departure: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    arrival: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    departure_time: 10,
                    arrival_time: 20,
                },
                date: 3,
                delay: 15,
                ticket_control: true,
            },
            Ride {
                id: 3,
                connection: Connection {
                    id: 2,
                    departure: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    arrival: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    departure_time: 30,
                    arrival_time: 40,
                },
                date: 2,
                delay: 10,
                ticket_control: false,
            },
        ];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn get_paginated_sorts_by_descending_date() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('A'), ('B');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20);
            INSERT INTO ride (connection_id, date, delay, ticket_control)
            VALUES (1, 500, 0, FALSE), (1, 200, 0, FALSE), (1, 600, 0, FALSE), (1, 300, 0, FALSE);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = get_paginated(&db, 50, 0).await;
        let expected = vec![
            Ride {
                id: 3,
                connection: Connection {
                    id: 1,
                    departure: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    arrival: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    departure_time: 10,
                    arrival_time: 20,
                },
                date: 600,
                delay: 0,
                ticket_control: false,
            },
            Ride {
                id: 1,
                connection: Connection {
                    id: 1,
                    departure: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    arrival: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    departure_time: 10,
                    arrival_time: 20,
                },
                date: 500,
                delay: 0,
                ticket_control: false,
            },
            Ride {
                id: 4,
                connection: Connection {
                    id: 1,
                    departure: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    arrival: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    departure_time: 10,
                    arrival_time: 20,
                },
                date: 300,
                delay: 0,
                ticket_control: false,
            },
            Ride {
                id: 2,
                connection: Connection {
                    id: 1,
                    departure: Station {
                        id: 1,
                        name: String::from("A"),
                    },
                    arrival: Station {
                        id: 2,
                        name: String::from("B"),
                    },
                    departure_time: 10,
                    arrival_time: 20,
                },
                date: 200,
                delay: 0,
                ticket_control: false,
            },
        ];
        assert_eq!(actual, expected);
    }

    #[tokio::test]
    async fn create_works() {
        let db = get_test_db().await;
        sqlx::query!(
            "
            INSERT INTO station (name)
            VALUES ('Void'), ('Heaven');
            INSERT INTO connection (departure_id, arrival_id, departure_time, arrival_time)
            VALUES (1, 2, 10, 20);
            "
        )
        .execute(&db)
        .await
        .unwrap();
        let actual = create(
            &db,
            CreateRide {
                connection_id: 1,
                date: 10,
                delay: 100,
                ticket_control: true,
            },
        )
        .await;
        let expected = 1;
        let records = sqlx::query!(
            "
            SELECT *
            FROM ride
            WHERE id = 1
            AND connection_id = 1
            AND date = 10
            AND delay = 100
            AND ticket_control = TRUE;
            "
        )
        .fetch_all(&db)
        .await
        .unwrap();
        assert_eq!(actual, expected);
        assert_eq!(records.len(), 1);
    }
}
