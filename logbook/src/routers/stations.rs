use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, put},
    Json, Router,
};
use serde::Deserialize;

use crate::{
    extractors::Authenticated,
    repos::{self, stations::StationReq},
    state::AppState,
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Departure {
    from: Option<i64>,
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_stations).post(post_station))
        .route("/:id", put(put_station))
}

// GET /api/stations
// GET /api/stations{?from}
async fn get_stations(
    _: Authenticated,
    State(state): State<AppState>,
    Query(ends): Query<Departure>,
) -> impl IntoResponse {
    let stations = match ends.from {
        None => repos::stations::get_all(&state.db).await,
        Some(from) => repos::stations::get_by_departure(&state.db, from).await,
    };
    Json(stations)
}

// POST /api/stations
async fn post_station(
    _: Authenticated,
    State(state): State<AppState>,
    Json(station): Json<StationReq>,
) -> impl IntoResponse {
    let station = repos::stations::create(&state.db, station).await;
    (StatusCode::CREATED, Json(station))
}

// PUT /api/stations/{id}
async fn put_station(
    _: Authenticated,
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(station): Json<StationReq>,
) -> impl IntoResponse {
    let station = repos::stations::update_by_id(&state.db, id, station).await;
    Json(station)
}
