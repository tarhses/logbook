use std::time::{Duration, Instant};

use reqwest::Client;
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use sqlx::SqlitePool;

use crate::{models::Game, state::IgdbState};

#[derive(Debug, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameReq {
    pub name: String,
    pub release_date: Option<i64>,
    pub finishable: bool,
    pub igdb_id: Option<i64>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GameSuggestion {
    pub name: String,
    pub release_date: Option<i64>,
    pub platforms: Vec<String>,
    pub igdb_id: i64,
    pub igdb_cover: Option<String>,
}

pub async fn get_paginated(db: &SqlitePool, limit: i64, offset: i64) -> Vec<Game> {
    sqlx::query_file_as!(Game, "sql/games/get_paginated.sql", limit, offset)
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn create(db: &SqlitePool, igdb: &IgdbState, game: GameReq) -> Game {
    let igdb_cover = match game.igdb_id {
        None => None,
        Some(igdb_id) => Some(fetch_igdb_cover(igdb, igdb_id).await),
    };
    sqlx::query_file_as!(
        Game,
        "sql/games/create.sql",
        game.name,
        game.release_date,
        game.finishable,
        game.igdb_id,
        igdb_cover
    )
    .fetch_one(db)
    .await
    .unwrap()
}

pub async fn autocomplete_by_name(igdb: &IgdbState, name: &str) -> Vec<GameSuggestion> {
    let name = name.replace('"', "");
    fetch_igdb::<Vec<IgdbGame>>(
        igdb,
        "games",
        format!("fields name, first_release_date, platforms.name, platforms.abbreviation, cover.image_id; search \"{name}\";"),
    )
    .await
    .unwrap_or_default()
    .into_iter()
    .map(Into::into)
    .collect()
}

// IGDB API
#[derive(Debug, Deserialize)]
struct IgdbToken {
    access_token: String,
    expires_in: u64,
}

#[derive(Debug, Serialize)]
struct IgdbTokenRequest {
    client_id: String,
    client_secret: String,
    grant_type: String,
}

#[derive(Debug, Deserialize)]
struct IgdbGame {
    id: i64,
    name: String,
    first_release_date: Option<i64>,
    platforms: Option<Vec<IgdbPlatform>>,
    cover: Option<IgdbCover>,
}

#[derive(Debug, Deserialize)]
struct IgdbPlatform {
    name: String,
    abbreviation: Option<String>,
}

#[derive(Debug, Deserialize)]
struct IgdbCover {
    image_id: String,
}

impl From<IgdbGame> for GameSuggestion {
    fn from(game: IgdbGame) -> Self {
        Self {
            igdb_id: game.id,
            name: game.name,
            release_date: game.first_release_date.map(|date| date * 1000),
            platforms: game
                .platforms
                .unwrap_or_default()
                .into_iter()
                .map(|platform| platform.abbreviation.unwrap_or(platform.name))
                .collect(),
            igdb_cover: game.cover.map(|cover| cover.image_id),
        }
    }
}

async fn fetch_igdb_cover(igdb: &IgdbState, igdb_id: i64) -> String {
    fetch_igdb::<IgdbCover>(
        igdb,
        "covers",
        format!("fields image_id; where game = {igdb_id};"),
    )
    .await
    .map(|cover| cover.image_id)
    .unwrap_or_default()
}

async fn fetch_igdb<T>(igdb: &IgdbState, endpoint: &str, body: String) -> reqwest::Result<T>
where
    T: DeserializeOwned,
{
    let access_token = if {
        let expires_at = igdb.expires_at.read().unwrap();
        Instant::now() >= *expires_at
    } {
        println!("Getting new token");
        let token: IgdbToken = Client::new()
            .post("https://id.twitch.tv/oauth2/token")
            .query(&IgdbTokenRequest {
                client_id: igdb.client_id.to_string(),
                client_secret: igdb.client_secret.to_string(),
                grant_type: String::from("client_credentials"),
            })
            .send()
            .await?
            .json()
            .await?;
        let access_token = token.access_token;
        let expires_in = token.expires_in;
        *(igdb.access_token.write().unwrap()) = access_token.clone();
        *(igdb.expires_at.write().unwrap()) = Instant::now() + Duration::from_secs(expires_in);
        access_token
    } else {
        println!("Getting cached token");
        igdb.access_token.read().unwrap().clone()
    };
    Client::new()
        .post(format!("https://api.igdb.com/v4/{endpoint}"))
        .header("Client-ID", igdb.client_id.as_ref())
        .bearer_auth(access_token)
        .body(body)
        .send()
        .await?
        .json()
        .await
}
