use std::{
    net::SocketAddr,
    sync::{Arc, RwLock},
    time::Instant,
};

use axum::{Router, Server};
use sqlx::SqlitePool;
use state::IgdbState;

use crate::state::AppState;

mod extractors;
mod models;
mod repos;
mod routers;
mod state;

const DEFAULT_DATABASE_URL: &str = "sqlite:db.sqlite3";
const DEFAULT_ADDRESS: &str = "127.0.0.1:80";

#[tokio::main(flavor = "current_thread")]
async fn main() {
    dotenvy::dotenv().ok();

    let addr = get_host();
    let db = get_db().await;
    let igdb = get_igdb();

    let app = Router::new()
        .nest(
            "/api",
            Router::new()
                .nest("/connections", routers::connections::router())
                .nest("/games", routers::games::router())
                .nest("/platforms", routers::platforms::router())
                .nest("/playthroughs", routers::playthroughs::router())
                .nest("/rides", routers::rides::router())
                .nest("/stations", routers::stations::router()),
        )
        .with_state(AppState { db, igdb });

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn get_host() -> SocketAddr {
    std::env::var("ADDRESS")
        .unwrap_or_else(|_| String::from(DEFAULT_ADDRESS))
        .parse()
        .unwrap()
}

async fn get_db() -> SqlitePool {
    let url = std::env::var("DATABASE_URL").unwrap_or_else(|_| String::from(DEFAULT_DATABASE_URL));
    SqlitePool::connect(&url).await.unwrap()
}

fn get_igdb() -> IgdbState {
    IgdbState {
        client_id: Arc::new(std::env::var("IGDB_CLIENT_ID").unwrap_or_default()),
        client_secret: Arc::new(std::env::var("IGDB_CLIENT_SECRET").unwrap_or_default()),
        access_token: Default::default(),
        expires_at: Arc::new(RwLock::new(Instant::now())),
    }
}
