use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, put},
    Json, Router,
};
use serde::Deserialize;
use sqlx::SqlitePool;

use crate::{
    extractors::Authenticated,
    repos::{self, stations::StationReq},
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Departure {
    from: Option<i64>,
}

pub fn router() -> Router<SqlitePool> {
    Router::new()
        .route("/", get(get_stations).post(post_station))
        .route("/{id}", put(put_station))
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
    Json(station): Json<StationReq>,
) -> impl IntoResponse {
    let station = repos::stations::create(&db, station).await;
    (StatusCode::CREATED, Json(station))
}

// PUT /api/stations/{id}
async fn put_station(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Path(id): Path<i64>,
    Json(station): Json<StationReq>,
) -> impl IntoResponse {
    let station = repos::stations::update_by_id(&db, id, station).await;
    Json(station)
}
