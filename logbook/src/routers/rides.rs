use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, put},
    Json, Router,
};

use crate::{
    extractors::Authenticated,
    repos::{self, rides::RideReq},
    routers::Page,
    state::AppState,
};

const DAY_AS_MILLIS: i64 = 24 * 60 * 60 * 1000;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_rides).post(post_ride))
        .route("/:id", put(put_ride))
}

// GET /api/rides{?limit,offset}
async fn get_rides(
    _: Authenticated,
    State(state): State<AppState>,
    Query(page): Query<Page>,
) -> impl IntoResponse {
    let rides = repos::rides::get_paginated(&state.db, page.limit, page.offset).await;
    Json(rides)
}

// POST /api/rides
async fn post_ride(
    _: Authenticated,
    State(state): State<AppState>,
    Json(mut ride): Json<RideReq>,
) -> impl IntoResponse {
    ride.date = normalize_date(ride.date);
    let id = repos::rides::create(&state.db, ride).await;
    let ride = repos::rides::get_by_id(&state.db, id).await;
    (StatusCode::CREATED, Json(ride))
}

// PUT /api/rides/{id}
async fn put_ride(
    _: Authenticated,
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(mut ride): Json<RideReq>,
) -> impl IntoResponse {
    ride.date = normalize_date(ride.date);
    repos::rides::update_by_id(&state.db, id, ride).await;
    let ride = repos::rides::get_by_id(&state.db, id).await;
    Json(ride)
}

fn normalize_date(timestamp: i64) -> i64 {
    timestamp / DAY_AS_MILLIS * DAY_AS_MILLIS
}
