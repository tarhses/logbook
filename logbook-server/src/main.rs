mod extractors;
mod models;
mod repos;

use std::net::SocketAddr;

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router, Server,
};
use serde::Deserialize;
use sqlx::SqlitePool;

use crate::extractors::Authenticated;
use crate::repos::{connections::CreateConnection, rides::CreateRide, stations::CreateStation};

const DEFAULT_DATABASE_URL: &str = "sqlite:db.sqlite3";
const DEFAULT_ADDRESS: &str = "127.0.0.1:80";

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let addr = get_host();
    let db = get_db().await;

    let app = Router::new()
        .route("/api/stations", get(get_stations).post(post_station))
        .route("/api/connections/:id", get(get_connection))
        .route(
            "/api/connections",
            get(get_connections).post(post_connection),
        )
        .route("/api/rides", get(get_rides).post(post_ride))
        .with_state(db);

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn get_db() -> SqlitePool {
    let url = std::env::var("DATABASE_URL").unwrap_or_else(|_| String::from(DEFAULT_DATABASE_URL));
    SqlitePool::connect(&url).await.unwrap()
}

fn get_host() -> SocketAddr {
    std::env::var("ADDRESS")
        .unwrap_or_else(|_| String::from(DEFAULT_ADDRESS))
        .parse()
        .unwrap()
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Departure {
    from: Option<i64>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Ends {
    from: i64,
    to: i64,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Page {
    limit: i64,
    offset: i64,
}

// GET /api/stations
// GET /api/stations{?from}
async fn get_stations(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Query(ends): Query<Departure>,
) -> impl IntoResponse {
    let stations = match ends.from {
        None => repos::stations::get_all(&db).await,
        Some(from) => repos::stations::get_by_departure(&db, from).await,
    };
    Json(stations)
}

// POST /api/stations
async fn post_station(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Json(station): Json<CreateStation>,
) -> impl IntoResponse {
    let station = repos::stations::create(&db, station).await;
    (StatusCode::CREATED, Json(station))
}

// GET /api/connections/{id}
async fn get_connection(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Path(id): Path<i64>,
) -> impl IntoResponse {
    let connection = repos::connections::get_by_id(&db, id).await;
    Json(connection)
}

// GET /api/connections{?from,to}
async fn get_connections(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Query(ends): Query<Ends>,
) -> impl IntoResponse {
    let connections = repos::connections::get_by_ends(&db, ends.from, ends.to).await;
    Json(connections)
}

// POST /api/connections
async fn post_connection(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Json(connection): Json<CreateConnection>,
) -> impl IntoResponse {
    let id = repos::connections::create(&db, connection).await;
    let connection = repos::connections::get_by_id(&db, id).await;
    (StatusCode::CREATED, Json(connection))
}

// GET /api/rides{?limit,offset}
async fn get_rides(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Query(page): Query<Page>,
) -> impl IntoResponse {
    let rides = repos::rides::get_paginated(&db, page.limit, page.offset).await;
    Json(rides)
}

// POST /api/rides
async fn post_ride(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Json(ride): Json<CreateRide>,
) -> impl IntoResponse {
    let id = repos::rides::create(&db, ride).await;
    let ride = repos::rides::get_by_id(&db, id).await;
    (StatusCode::CREATED, Json(ride))
}
