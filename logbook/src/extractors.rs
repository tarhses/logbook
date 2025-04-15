use axum::{
    extract::FromRequestParts,
    http::{request::Parts, StatusCode},
};
use base64ct::{Base64, Encoding};
use sqlx::SqlitePool;

use crate::repos::tokens;

pub struct Authenticated;

impl FromRequestParts<SqlitePool> for Authenticated {
    type Rejection = (StatusCode, &'static str);

    async fn from_request_parts(
        parts: &mut Parts,
        db: &SqlitePool,
    ) -> Result<Self, Self::Rejection> {
        let token = parts
            .headers
            .get("Authorization")
            .and_then(|header| header.to_str().ok())
            .and_then(|header| header.strip_prefix("Bearer "))
            .and_then(|token| Base64::decode_vec(token).ok());
        if let Some(token) = token {
            if tokens::exists(db, &token).await {
                Ok(Authenticated)
            } else {
                Err((StatusCode::UNAUTHORIZED, "invalid auth token"))
            }
        } else {
            Err((StatusCode::UNAUTHORIZED, "missing or badly formatted token"))
        }
    }
}
