use std::net::SocketAddr;

use axum::{Router, Server};
use sqlx::SqlitePool;

mod extractors;
mod models;
mod repos;
mod routers;

const DEFAULT_DATABASE_URL: &str = "sqlite:db.sqlite3";
const DEFAULT_ADDRESS: &str = "127.0.0.1:80";

#[tokio::main(flavor = "current_thread")]
async fn main() {
    dotenvy::dotenv().ok();

    let addr = get_host();
    let db = get_db().await;

    let app = Router::new()
        .nest(
            "/api",
            Router::new()
                .nest("/stations", routers::stations::router())
                .nest("/connections", routers::connections::router())
                .nest("/rides", routers::rides::router()),
        )
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
