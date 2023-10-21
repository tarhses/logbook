use serde::Deserialize;

pub mod connections;
pub mod games;
pub mod platforms;
pub mod playthroughs;
pub mod rides;
pub mod stations;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Page {
    pub limit: i64,
    pub offset: i64,
}
