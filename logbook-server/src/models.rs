use serde::Serialize;

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
