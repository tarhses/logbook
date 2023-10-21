use serde::{Deserialize, Serialize};

// TODO: Move in train models.
#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Station {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Connection {
    pub id: i64,
    pub departure: Station,
    pub arrival: Station,
    pub departure_time: i64,
    pub arrival_time: i64,
}

#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Ride {
    pub id: i64,
    pub connection: Connection,
    pub date: i64,
    pub delay: i64,
    pub ticket_control: bool,
}

// TODO: Move in game models.
#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub id: i64,
    pub name: String,
    pub release_date: Option<i64>,
    pub finishable: bool,
    pub igdb_id: Option<i64>,
    pub igdb_cover: Option<String>,
}

#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Platform {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Playthrough {
    pub id: i64,
    pub game: Game,
    pub platform: Platform,
    pub start_date: i64,
    pub start_date_precision: DatePrecision,
    pub finished: bool,
    pub comment: String,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum DatePrecision {
    Day,
    Month,
    Year,
    None,
}

impl From<i64> for DatePrecision {
    fn from(value: i64) -> Self {
        match value {
            0 => Self::Day,
            1 => Self::Month,
            2 => Self::Year,
            3 => Self::None,
            _ => unreachable!("the database should constraint the value"),
        }
    }
}

impl From<DatePrecision> for i64 {
    fn from(value: DatePrecision) -> Self {
        match value {
            DatePrecision::Day => 0,
            DatePrecision::Month => 1,
            DatePrecision::Year => 2,
            DatePrecision::None => 3,
        }
    }
}
