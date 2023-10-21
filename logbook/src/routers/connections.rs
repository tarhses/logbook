use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use serde::Deserialize;

use crate::{
    extractors::Authenticated,
    repos::{self, connections::ConnectionReq},
    state::AppState,
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Ends {
    from: i64,
    to: i64,
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_connections).post(post_connection))
        .route("/:id", get(get_connection).put(put_connection))
}

// GET /api/connections/{id}
async fn get_connection(
    _: Authenticated,
    State(state): State<AppState>,
    Path(id): Path<i64>,
) -> impl IntoResponse {
    let connection = repos::connections::get_by_id(&state.db, id).await;
    Json(connection)
}

// GET /api/connections{?from,to}
async fn get_connections(
    _: Authenticated,
    State(state): State<AppState>,
    Query(ends): Query<Ends>,
) -> impl IntoResponse {
    let connections = repos::connections::get_by_ends(&state.db, ends.from, ends.to).await;
    Json(connections)
}

// POST /api/connections
async fn post_connection(
    _: Authenticated,
    State(state): State<AppState>,
    Json(connection): Json<ConnectionReq>,
) -> impl IntoResponse {
    let id = repos::connections::create(&state.db, connection).await;
    let connection = repos::connections::get_by_id(&state.db, id).await;
    (StatusCode::CREATED, Json(connection))
}

// PUT /api/connections/{id}
async fn put_connection(
    _: Authenticated,
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(connection): Json<ConnectionReq>,
) -> impl IntoResponse {
    repos::connections::update_by_id(&state.db, id, connection).await;
    let connection = repos::connections::get_by_id(&state.db, id).await;
    Json(connection)
}
