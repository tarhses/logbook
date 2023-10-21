use std::{
    sync::{Arc, RwLock},
    time::Instant,
};

use sqlx::SqlitePool;

#[derive(Clone)]
pub struct AppState {
    pub db: SqlitePool,
    pub igdb: IgdbState,
}

#[derive(Clone)]
pub struct IgdbState {
    pub client_id: Arc<String>,
    pub client_secret: Arc<String>,
    pub access_token: Arc<RwLock<String>>,
    pub expires_at: Arc<RwLock<Instant>>,
}
