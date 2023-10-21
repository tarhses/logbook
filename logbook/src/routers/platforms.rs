use axum::{extract::State, response::IntoResponse, routing::get, Json, Router};

use crate::{
    extractors::Authenticated,
    repos::{self, platforms::PlatformReq},
    state::AppState,
};

pub fn router() -> Router<AppState> {
    return Router::new().route("/", get(get_platforms).post(post_platform));
}

// GET /api/platforms
async fn get_platforms(_: Authenticated, State(state): State<AppState>) -> impl IntoResponse {
    let platforms = repos::platforms::get_all(&state.db).await;
    Json(platforms)
}

// POST /api/platforms
async fn post_platform(
    _: Authenticated,
    State(state): State<AppState>,
    Json(platform): Json<PlatformReq>,
) -> impl IntoResponse {
    let platform = repos::platforms::create(&state.db, platform).await;
    Json(platform)
}
