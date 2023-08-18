use serde::Deserialize;

pub mod connections;
pub mod rides;
pub mod stations;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Page {
    pub limit: i64,
    pub offset: i64,
}
