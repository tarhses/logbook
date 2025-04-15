use axum::Router;
use sqlx::SqlitePool;
use tokio::net::TcpListener;

mod config;
mod extractors;
mod models;
mod repos;
mod routers;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let cfg = config::load().unwrap_or_else(|err| {
        eprintln!("Unable to load configuration.\n{err}");
        std::process::exit(1);
    });

    let addr = cfg.address;
    let db = SqlitePool::connect(&cfg.database).await.unwrap();

    let app = Router::new()
        .nest(
            "/api",
            Router::new()
                .nest("/stations", routers::stations::router())
                .nest("/connections", routers::connections::router())
                .nest("/rides", routers::rides::router()),
        )
        .with_state(db);

    let listener = TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
