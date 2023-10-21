use axum::{
    extract::{Query, State},
    response::IntoResponse,
    routing::get,
    Json, Router,
};

use crate::{
    extractors::Authenticated,
    repos::{self, playthroughs::PlaythroughReq},
    routers::Page,
    state::AppState,
};

pub fn router() -> Router<AppState> {
    Router::new().route("/", get(get_playthroughs).post(post_playthrough))
}

// GET /api/playthroughs{?limit,offset}
async fn get_playthroughs(
    _: Authenticated,
    State(state): State<AppState>,
    Query(page): Query<Page>,
) -> impl IntoResponse {
    let playthroughs = repos::playthroughs::get_paginated(&state.db, page.limit, page.offset).await;
    Json(playthroughs)
}

// POST /api/playthroughs
async fn post_playthrough(
    _: Authenticated,
    State(state): State<AppState>,
    Json(playthrough): Json<PlaythroughReq>,
) -> impl IntoResponse {
    let id = repos::playthroughs::create(&state.db, playthrough).await;
    let playthrough = repos::playthroughs::get_by_id(&state.db, id).await;
    Json(playthrough)
}
