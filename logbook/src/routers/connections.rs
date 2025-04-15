use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use serde::Deserialize;
use sqlx::SqlitePool;

use crate::{
    extractors::Authenticated,
    repos::{self, connections::ConnectionReq},
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Ends {
    from: i64,
    to: i64,
}

pub fn router() -> Router<SqlitePool> {
    Router::new()
        .route("/", get(get_connections).post(post_connection))
        .route("/{id}", get(get_connection).put(put_connection))
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
    Json(connection): Json<ConnectionReq>,
) -> impl IntoResponse {
    let id = repos::connections::create(&db, connection).await;
    let connection = repos::connections::get_by_id(&db, id).await;
    (StatusCode::CREATED, Json(connection))
}

// PUT /api/connections/{id}
async fn put_connection(
    _: Authenticated,
    State(db): State<SqlitePool>,
    Path(id): Path<i64>,
    Json(connection): Json<ConnectionReq>,
) -> impl IntoResponse {
    repos::connections::update_by_id(&db, id, connection).await;
    let connection = repos::connections::get_by_id(&db, id).await;
    Json(connection)
}
