use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use serde::Deserialize;

use crate::{
    extractors::Authenticated,
    repos::{self, games::GameReq},
    routers::Page,
    state::AppState,
};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Criteria {
    name: String,
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_games).post(post_game))
        .route("/autocomplete", get(get_suggestions))
}

// GET /api/games{?limit,offset}
async fn get_games(
    _: Authenticated,
    State(state): State<AppState>,
    Query(page): Query<Page>,
) -> impl IntoResponse {
    let games = repos::games::get_paginated(&state.db, page.limit, page.offset).await;
    Json(games)
}

// POST /api/games
async fn post_game(
    _: Authenticated,
    State(state): State<AppState>,
    Json(game): Json<GameReq>,
) -> impl IntoResponse {
    let game = repos::games::create(&state.db, &state.igdb, game).await;
    (StatusCode::CREATED, Json(game))
}

// GET /api/games/autocomplete{?name}
async fn get_suggestions(
    _: Authenticated,
    State(state): State<AppState>,
    Query(criteria): Query<Criteria>,
) -> impl IntoResponse {
    let suggestions = repos::games::autocomplete_by_name(&state.igdb, &criteria.name).await;
    Json(suggestions)
}
